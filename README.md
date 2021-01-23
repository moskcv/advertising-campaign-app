## Installation

Clone repo
```cli
git clone
```

Install dependencies
```cli
composer install
```

Start Docker
```cli
./vendor/bin/sail up
```

Install npm dependencies and build
```cli
./vendor/bin/sail npm install && npm run prod
```

Run migrations
```cli
./vendor/bin/sail atrisan migrate
```
