import csv
import json

with open("dados_estacao_meteorologica_set_out_2026.csv",
          "r", encoding="utf-8-sig", newline="") as arquivo:
    leitor = csv.DictReader(arquivo, delimiter=";")
    medicoes = []

    for linha in leitor:
        medicoes.append({
            "timestamp": linha["Data"].strip(),
            "temperature": float(linha["Temperatura"].replace("°C", "").strip()),
            "humidity": float(linha["Umidade"].replace("%", "").strip()),
            "pressure": float(linha["Pressão"].replace("hPa", "").strip()),
            "luminosity": float(linha["Luminosidade"].strip()),
            "raindrop": float(linha["Chuva"].strip())
        })

with open("dados_estacao.json", "w", encoding="utf-8") as arquivo:
    json.dump(medicoes, arquivo, ensure_ascii=False, indent=2)

print(f"{len(medicoes)} medições convertidas para dados_estacao.json")
