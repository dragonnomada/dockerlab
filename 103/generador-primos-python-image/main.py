f = open("primos.txt", "w")

primos = [2]

n = 2

while len(primos) < 20:
    esPrimo = True
    for p in primos:
        if n % p == 0:
            esPrimo = False
    if esPrimo:
        primos.append(n)
    n += 1

print(primos)

f.write(" ".join(map(str, primos)))

f.close()