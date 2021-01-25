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

Install app key
```cli
./vendor/bin/sail artisan key:generate
```

After migration open <a href="http://localhost">http://localhost</a> or <a href="http://127.0.0.1">http://127.0.0.1</a> to view the project


## Configuration
You could specify max uploaded file size and allowed image mimes in `.env` file
```.dotenv
MAX_FILE_SIZE=2048 #in kilobytes
ALLOWED_MIMES="jpg,jpeg,png" #Comma separated list of allowed mime types
```
