## Installation

Clone repo
```cli
git clone
```

Create .env file
```cli
cp .env.example .env
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
./vendor/bin/sail artisan migrate
```

After migration open <a href="http://localhost">http://localhost</a> or <a href="http://127.0.0.1">http://127.0.0.1</a> to view th project
