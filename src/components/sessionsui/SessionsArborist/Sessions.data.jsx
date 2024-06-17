export const data = [
  {
    id: "1",
    name: "public",
    children: [
      {
        id: "c1-1",
        name: "Project 1",
        sessionsContent: [
          {
            index: 0,
            content: [
              {
                user: "Hello!",
                ai: "```python\ndef vigenere_cipher(key, text):\n    def shift_char(c, k):\n        # Only shift alphabetic characters\n        if c.isalpha():\n            # Determine if character is upper or lower case\n            offset = ord('A') if c.isupper() else ord('a')\n            # Shift character based on key\n            shifted = (ord(c) - offset + k) % 26 + offset\n            return chr(shifted)\n        else:\n            return c\n    \n    encrypted_text = []\n    key_length = len(key)\n    key_indices = [ord(k.upper()) - ord('A') for k in key]  # Normalize key to 0-25\n\n    for i, char in enumerate(text):\n        key_index = key_indices[i % key_length]  # Cycle through key\n        encrypted_char = shift_char(char, key_index)\n        encrypted_text.append(encrypted_char)\n    \n    return ''.join(encrypted_text)\n\n# Example usage:\nkey = \"KEY\"\ntext = \"HELLO WORLD\"\nencrypted = vigenere_cipher(key, text)\nprint(\"Encrypted text:\", encrypted)",
              },
            ],

            parentID: "null",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "VoiceCode",
    children: [
      {
        id: "c2-1",
        name: "Project 1",
      },
    ],
  },
  {
    id: "3",
    name: "Google",
  },
];
