<h1 align="center">
Product Form Wizard
</h1>
<p align="center">
Niewielka aplikacja stworzona w <a href="https://react.dev/" target="_blank">React</a> i <a href="https://nextjs.org" target="_blank">Next.js</a>, hostowana na <a href="https://vercel.com/" target="_blank">Vercel</a>.
</p>

<p align="center">
  <a href="https://product-form-wizard.vercel.app/" target="_blank">Podgląd</a>
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/noszczykmichal/product-form-wizard/main/src/assets/demo.png" width="700" alt="demo" />
</p>

## Zawartość

- [Opis](#opis)
- [Stack](#stack)
- [Decyzje Projektowe](#decyzje-projektowe)
- [Uruchamianie](#uruchamianie)
- [Acknowledgements](#acknowledgements)

## Opis

Niewielka aplikacja w Next.js wyświetlająca tabelę produktów z katalogu. Kliknięcie przycisku „Dodaj produkt” otwiera okno dialogowe z trzyetapowym formularzem: informacje podstawowe, cena oraz dostępność. Każdy krok jest walidowany przed przejściem dalej, a ceny netto i brutto przeliczają się automatycznie na podstawie stawki VAT. Po poprawnym wypełnieniu formularza produkt trafia do tabeli.
Stan formularza zarządzany jest przez TanStack Form i walidowany schematami Zod (osobny schemat dla każdego kroku). Paginacja tabeli jest przechowywana w URL za pomocą nuqs, dzięki czemu odświeżenie strony zachowuje widok. Interfejs zbudowano z komponentów shadcn/ui, dostosowanych do projektu z Figmy.

## Stack

- [Next.js](https://nextjs.org/), [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- Stylowanie: [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/)
- Stan formularza i walidacja: [TanStack Form](https://tanstack.com/form/latest), [Zod](https://zod.dev/)
- Stan w URL (paginacja): [nuqs](https://nuqs.dev/)

## Decyzje Projektowe

Poniżej opisuję miejsca, w których specyfikacja lub projekt w Figmie nie rozstrzygały zachowania i musiałem podjąć własną decyzję.

### Pole „Ilość na magazynie”

- Pole nie ma makiety w Figmie. Umieściłem je w tej samej sekcji co checkbox „Produkt limitowany” i pokazuję je dopiero po jego zaznaczeniu.
- Pole domyślnie jest puste. Wartość domyślna `0` spełniałaby walidację automatycznie, więc wymóg „wymagane, gdy zaznaczono limitowany” nie miałby żadnego efektu.
- Walidacja jest warunkowa (`superRefine`): ilość jest sprawdzana tylko wtedy, gdy produkt jest limitowany. Dla produktu nielimitowanego pole nie trafia do zapisanego produktu.
- Rozważałem rezerwowanie miejsca na ukryte pole, żeby uniknąć przesunięcia układu, ale przy niezaznaczonym checkboxie zostawiało to dużą pustą przestrzeń. Dlatego pole jest renderowane tylko wtedy, gdy checkbox jest zaznaczony.

### Wartości domyślne

- Limity koszyka mają domyślnie min. 1 i maks. 10, zgodnie z Figmą.
- Ceny są domyślnie puste, żeby użytkownik świadomie je wpisał, a w polach były widoczne placeholdery z projektu.
- Specyfikacja nie określa wartości domyślnych dla stawki VAT i waluty, dlatego na podstawie makiet ustawiłem je na 23% i PLN. Użytkownik może je zmienić w dowolnym momencie, a zmiana stawki VAT przelicza cenę brutto zgodnie ze specyfikacją.

### Walidacja i komunikaty błędów

- Pola są walidowane na bieżąco (przy zmianie i przy opuszczeniu pola). Przycisk „Dalej” waliduje cały krok schematem Zod i zaznacza wszystkie błędne pola.
- Błąd zapisany przy opuszczeniu pola jest czyszczony, gdy użytkownik zaczyna pisać, więc zawsze widać aktualny komunikat.
- Wszystkie komunikaty są po polsku, także dla pustych pól liczbowych, gdzie Zod domyślnie zwraca komunikat po angielsku.
- Błąd „maks. < min.” jest pokazywany przy polu „Maksymalna ilość” i aktualizuje się również po zmianie wartości minimalnej.

### Cena brutto

- W formularzu ceny netto i brutto są edytowalne i przeliczają się wzajemnie wg wzoru ze specyfikacji (zaokrąglenie do 2 miejsc po przecinku).
- W zapisanym produkcie przechowywana jest tylko cena netto i stawka VAT. Cena brutto w tabeli jest wyliczana, żeby obie wartości nie mogły się rozjechać.

### Paginacja po odświeżeniu strony

- Numer strony jest przechowywany w URL (`?page=N`) przez nuqs, więc odświeżenie zachowuje widok.
- Specyfikacja nie określa, co ma się dziać z dodanymi produktami po przeładowaniu strony. Produkty są trzymane w stanie komponentu i nie są utrwalane, więc po odświeżeniu lista wraca do 5 produktów mockowych. Utrwalenie produktów (np. w localStorage) byłoby prostym rozszerzeniem, ale świadomie go nie dodawałem, żeby nie wychodzić poza wymagania zadania.
- Jeśli URL wskazuje nieistniejącą stronę (np. `?page=2` po odświeżeniu albo ręcznie wpisane `?page=99`), aplikacja wyświetla ostatnią dostępną stronę i poprawia parametr w URL, zamiast pokazywać pustą tabelę.

### Dodanie produktu

- Po dodaniu produktu użytkownik jest przenoszony na stronę tabeli, na której produkt się pojawił, żeby od razu go zobaczył.

### Stany nieopisane w Figmie

- Główny przycisk ma w projekcie tylko stan domyślny (niebieski). Stany hover i focus z zestawu shadcn w Figmie pozostały czarne, więc wyprowadziłem je z konwencji shadcn dla koloru niebieskiego (`--primary` ustawiony w motywie, a nie nadpisywany w komponentach).
- Rozwinięty select nie ma makiety. Podświetlenie opcji jest wyraźniejsze niż domyślne, żeby było widoczne przy nawigacji klawiaturą.
- Brakuje też makiet zaznaczonych cech produktu (chipów) i zaznaczonego checkboxa. W obu przypadkach, dla spójności, użyłem koloru głównego aplikacji.
- Przycisk „Wstecz” w projekcie jest zwykłą ramką bez zdefiniowanych stanów, dlatego stan hover dodałem samodzielnie, tak aby był widoczny na tle stopki.

## Uruchamianie

Aby uruchomić ten projekt lokalnie:

1. Sklonuj repozytorium

```bash
git clone https://github.com/noszczykmichal/product-form-wizard
```

2. Przejdź do katalogu projektu

```bash
cd product-form-wizard
```

3. Zainstaluj zależności

```bash
npm install
```

4. Uruchom aplikację

```bash
npm run dev
```

Aplikacja będzie dostępna pod adresem [http://localhost:3000](http://localhost:3000).

## Acknowledgements

Projekt UI i specyfikacja zadania: WorkConnect Sp. z o.o.
