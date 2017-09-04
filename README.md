> test-productman

# Goal
Build a simple web app using both [Angular](https://angular.io/tutorial) and [Django](https://www.djangoproject.com/) and this project as the starting point.

The scope of the application is up to you, even if we recommend something simple such as [Angular Tour of Heroes](https://angular.io/tutorial).

__Expected outcome__:
 - at least one [db model](https://docs.djangoproject.com/en/1.11/topics/db/models/)
 - a few REST endpoints
 - well organized / tested application following both [Angular](https://angular.io/tutorial)'s and [Django](https://www.djangoproject.com/)'s best practices

__NOTES__:
 - do NOT change `package.json` scripts
 - on your final release, make sure all tests / linters are passing (`yarn test:all`)
 - use `angular-cli` as much as possible
 - implement endpoints in `server/apiv1` using [django-rest-framework viewsets](http://www.django-rest-framework.org/api-guide/viewsets/)
 - use [Django Fixtures](https://docs.djangoproject.com/en/1.11/howto/initial-data/) to pre-populate your database with hard-coded data
 - we __strongly__ encourage [Pycharm CE](https://www.jetbrains.com/pycharm/download/) for backend development and [vscode](https://code.visualstudio.com/) for frontend development.


# Setup
Fork this repo then:
```shell
$ cd ~/path/to/your/projects/dir
$ git clone git@github.com:<USER>/test-productman.git
```

NOTE: add `nicolaspanel` as collaborator of the Fork.

## pyenv & python dependencies
Install pyenv following https://github.com/pyenv/pyenv-installer then:
```shell
$ pyenv install 3.6.2
$ pyenv virtualenv 3.6.2 test-productman
$ pip install -U pip
$ pip install -r requirements.dev.txt
$ python manage.py collectstatic  --noinput
```

## setup development DB
Make sure [docker](https://docs.docker.com/engine/installation/linux/docker-ce/ubuntu/) is installed then:
```shell
$ docker run --name test-productman-postgres -e POSTGRES_PASSWORD=pwd -e POSTGRES_USER=dev -p 5432:5432 -d postgres
$ python manage.py migrate
```

## nodejs
```shell
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.3/install.sh | bash
$ nvm install 8.4
$ nvm use 8.4
$ npm install -g yarn
$ yarn install
```

# Development server

Run `yarn dev:start` to start the development server then navigate to http://localhost:4300/.

NOTE: The app will automatically reload if you change any of the source files.

## Test
Run `yarn test:all` to test the entire project.

See `package.json#scripts` and `python manage.py --help` for all available commands.
