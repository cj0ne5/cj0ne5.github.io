#!/bin/bash

# Prompt for the location of the private key, with a default of ~/.ssh/id_rsa
read -p "Enter the path to your private key (default: ~/.ssh/id_rsa): " private_key_path
private_key_path=${private_key_path:-~/.ssh/id_rsa}
private_key_path=$(eval echo $private_key_path)

if [ ! -f "$private_key_path" ]; then
  echo "Error: $private_key_path: No such file or directory."
  exit 1
fi

# Convert the private key to PEM format if necessary, suppressing output
ssh-keygen -p -m PEM -f $private_key_path -P "" -N "" >/dev/null 2>&1

# Prompt for the location of the encrypted file
read -p "Enter the path to the encrypted file (default: ./rsa_encryption_activity/receive/encrypted_message.b64): " encrypted_file
encrypted_file=${encrypted_file:-./rsa_encryption_activity/receive/encrypted_message.b64}

# Decrypt the message
base64 -d -i $encrypted_file | openssl pkeyutl -decrypt -inkey $private_key_path > ./rsa_encryption_activity/receive/decrypted_message.txt

# Inform the user that the message has been decrypted
echo "Decrypted! The message has been decrypted and saved into your receive folder."

echo "The message says:"

cat ./rsa_encryption_activity/receive/decrypted_message.txt
