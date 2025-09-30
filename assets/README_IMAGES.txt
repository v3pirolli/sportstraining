Place these image files in this folder (assets/):

- treino-dumbbell-1.jpg  (hero image)
  - optional: treino-dumbbell-1.webp
- equipe-ct-1.jpg        (about image with coaches)
  - optional: equipe-ct-1.webp

Suggested mapping for your photos:
1) Halteres (aluna) -> treino-dumbbell-1.jpg/.webp
2) Professores -> equipe-ct-1.jpg/.webp
3) Batalha de cordas -> treino-battle-ropes.jpg/.webp
4) Kettlebell unilateral -> treino-kettlebell-1.jpg/.webp
5) Acompanhamento -> acompanhamento-personal.jpg/.webp
6) Ponte com bola -> treino-hip-bridge-bola.jpg/.webp
7) Espaço CT (close) -> espaco-ct-1.jpg/.webp
8) Espaço CT (panorâmica) -> espaco-ct-panoramica.jpg/.webp

Convert to WebP (requires cwebp):
- Single:  cwebp treino-dumbbell-1.jpg -q 82 -o treino-dumbbell-1.webp
- Batch (PowerShell):
  Get-ChildItem . -Include *.jpg,*.jpeg,*.png -Recurse | ForEach-Object {
    $webp = $_.FullName -replace '\.(jpg|jpeg|png)$','.webp'
    cwebp $_.FullName -q 82 -o $webp
  }

Alt text examples (be local and descriptive):
- treino funcional em grupo na SPORTS TRAINING Caxias do Sul
- personal trainer orientando aluno na SPORTS TRAINING em Caxias do Sul

