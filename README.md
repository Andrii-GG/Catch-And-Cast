# Інструкція для запуску Backend API на C#

## Вимоги до середовища

1. **.NET SDK**: Завантажте та встановіть останню версію .NET SDK [з офіційного сайту](https://dotnet.microsoft.com/).
2. **Microsoft SQL Server**.
3. **IDE** (рекомендовано): [Visual Studio](https://visualstudio.microsoft.com/) або [Visual Studio Code](https://code.visualstudio.com/).
4. **Git**: Встановіть [Git](https://git-scm.com/) для клонування репозиторію.

---

## Кроки запуску

### 1. Клонування репозиторію

### 2. Налаштування середовища:

Файл `appsettings.json` або `appsettings.Development.json` повинен містити актуальні параметри підключення до бази даних. Можна скопіювати наступне:

"ConnectionStrings": {
"CatchAndCast": "Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=CatchAndCast;Integrated Security=True;Connect Timeout=30;Encrypt=False;Trust Server Certificate=False;Application Intent=ReadWrite;Multi Subnet Failover=False"
}

### 3. Оновлення БД

У разі існування бази даних, зайдіть в SQL Server Object Explorer і видаліть існуючу базу даних, наступним кроком зайдіть в Package Manager Console, де виставляємо Default Project - CatchAndCast.Api, а у Solution Explorer CatchAndCast.Data встановлюємо як "Set as Startup Project". І у відкритій Package Manager Console прописуємо Update-Database. При виникненні помилок напишіть нам на гарячу лінію.

### 4. Запуск

Встановлюємо Set as Startup Project проєкт CatchAndCast.Api і запускайте.
