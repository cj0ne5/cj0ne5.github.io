#!/bin/bash

# 
mkdir -p rsa_encryption_activity
mkdir -p rsa_encryption_activity/send
mkdir -p rsa_encryption_activity/receive

# Prompt for partner's GitHub username
read -p "Enter your partner's GitHub username or a direct link to their public keys file: " input

if [[ "$input" =~ ^https?:// ]]; then
    # If the input is a URL, download the keys from the provided link
    curl -s "$input" > rsa_encryption_activity/partner_keys.pub
else
    # Otherwise, assume the input is a GitHub username and download the keys from GitHub
    curl -s https://github.com/${input}.keys > rsa_encryption_activity/partner_keys.pub
fi

# Count the number of keys
key_count=$(wc -l < rsa_encryption_activity/partner_keys.pub)

if [ "$key_count" -gt 1 ]; then
    # If there are multiple keys, list them and prompt the user to select one
    echo "Your partner has multiple public keys. Please select one:"
    awk '{print NR "): " $0}' rsa_encryption_activity/partner_keys.pub

    # Prompt the user to choose a key number
    read -p "Enter the number corresponding to the key you'd like to use: " key_number

    # Extract the selected key and save it to a file
    awk "NR==$key_number" rsa_encryption_activity/partner_keys.pub > rsa_encryption_activity/partner_key.pub
    echo "You have selected key number $key_number."
else
    cp rsa_encryption_activity/partner_keys.pub rsa_encryption_activity/partner_key.pub
fi

# Prompt the user for a secret message
read -p "Enter the secret message you want to encrypt: " secret_message

# Write the secret message to a file
echo -n "$secret_message" > rsa_encryption_activity/send/secret_message.txt

# Check the version of OpenSSL
openssl_version=$(openssl version)

if [[ "$openssl_version" =~ ^OpenSSL ]]; then
    # Convert the selected key to PEM format
    ssh-keygen -f rsa_encryption_activity/partner_key.pub -e -m PEM > rsa_encryption_activity/partners_public_key.pem

    # Encrypt the message using the selected PEM public key
    cat rsa_encryption_activity/send/secret_message.txt | openssl pkeyutl -encrypt -pubin -inkey rsa_encryption_activity/partners_public_key.pem | base64 > rsa_encryption_activity/send/encrypted_message.b64
elif [[ "$openssl_version" =~ ^LibreSSL ]]; then
    # Different version of the code for LibreSSL
    # Convert the selected key to PKCS8 format
    ssh-keygen -f rsa_encryption_activity/partner_key.pub -e -m PKCS8 > rsa_encryption_activity/partners_public_key.pem

    # Encrypt the message using the selected PEM public key with LibreSSL
    cat rsa_encryption_activity/send/secret_message.txt | openssl rsautl -encrypt -pubin -inkey rsa_encryption_activity/partners_public_key.pem | base64 > rsa_encryption_activity/send/encrypted_message.b64
else
    echo "Unsupported OpenSSL version: $openssl_version"
    exit 1
fi

# Inform the user that the message has been encrypted
echo "Your message has been encrypted and saved to rsa_encryption_activity/send/encrypted_message.b64."

rm rsa_encryption_activity/partner_keys.pub
rm rsa_encryption_activity/partner_key.pub
rm rsa_encryption_activity/send/secret_message.txt
