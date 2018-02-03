#include <stdio.h>
#include <stdint.h>
#include <inttypes.h>

void print_bytes(uint64_t);

uint64_t plain_text = 0x0123456789abcdef;
uint64_t key = 0x0123456789abcdef;

void get_first_key() {
  uint64_t byte7 = (key & 0x00000000000000fe);
  uint64_t byte6 = (key & 0x000000000000fe00);
  uint64_t byte5 = (key & 0x0000000000fe0000);
  uint64_t byte4 = (key & 0x00000000fe000000);
  uint64_t byte3 = (key & 0x000000fe00000000);
  uint64_t byte2 = (key & 0x0000fe0000000000);
  uint64_t byte1 = (key & 0x00fe000000000000);
  uint64_t byte0 = (key & 0xfe00000000000000);

  // upper 56 bits should be next key
  uint64_t first_key = (byte0) || (byte1 << 1) || (byte2 << 2) || (byte3 << 3) || (byte4 << 4) || (byte5 << 5) || (byte6 << 6) || (byte7 << 7);
  printf("first_key: \n");
  print_bytes(first_key);
  return;
}

void print_bytes(uint64_t bytes) {
  int i = 1;
  for (i = 1; i < 8; i++ ) {
    printf("byte %i: %"PRIx8"\n", i, (bytes >> (64 - 8*i)));
  }
}

int main() {
  print_bytes(key);
  get_first_key();
  return 0;
}
