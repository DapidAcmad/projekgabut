import random
angka_rahasia = random.randint(1, 100)
print("=== GAME TEBAK ANGKA (1 - 100)")
while True:
    tebakan = int(input("Tebak angkanya: "))
    if tebakan < angka_rahasia:
        print("Angka Kekecilan! Coba lagi.\n"
              )
    elif tebakan > angka_rahasia:
        print("Angka Kebesaran! Coba lagi.\n"
              )
    else:
        print("Gokil Menang! !\nangkanya emang",angka_rahasia)
        break
    
