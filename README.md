> basic onboarding exercise for fullstack web developers

# Goal
Build a simple TODO web app using both [Angular](https://angular.io/) and [Django](https://www.djangoproject.com/) and this project as the starting point.

The application is composed of 2 pages:
 - the `landing` page: for unauthenticated users
   
   __Required__: enable user to sign in / sign up using email & password (no email verification)
   
   __Tips__: try do make something pretty but do not spend to much time on it
    
 - the `home` page: for authenticated users
   
   __Required__: 
     - the user can add, edit, remove todos
     - the number of todos is displayed and updated dynamically (see [Angular Pipes](https://angular.io/guide/pipes))
     - the user can logout 
   
   __Tips__: use [TodoMVC](http://todomvc.com/)'s UX/UI as much as possible


__Expected outcome__:
 - a [django db model](https://docs.djangoproject.com/en/1.11/topics/db/models/) for the todos
 - a few REST endpoints
 - manage the state of the application using [ngrx](https://github.com/ngrx/platform)
 - well organized & tested application following both [Angular](https://angular.io/tutorial)'s and [Django](https://www.djangoproject.com/)'s best practices

__NOTES__:
 - do NOT change `package.json#scripts` (ie `test`, `dev:start`, etc.)
 - use `angular-cli` as much as possible


# Project Setup
__Fork this repo__ then:
```shell
$ cd ~/path/to/your/projects/dir
$ git clone git@github.com:<USER>/test-fullstack.git
```

NOTE: add `nicolaspanel` as collaborator of the Fork.

## pyenv & python dependencies
Install pyenv following https://github.com/pyenv/pyenv-installer then:
```shell
$ pyenv install 3.6.2
$ pyenv virtualenv 3.6.2 test-fullstack
$ pip install -U pip
$ pip install -r requirements.dev.txt
```

## Setup development DB
Make sure [docker](https://docs.docker.com/engine/installation/linux/docker-ce/ubuntu/) is installed then:
```shell
$ docker run --name test-fullstack-postgres -e POSTGRES_PASSWORD=pwd -e POSTGRES_USER=dev -p 5432:5432 -d postgres
$ python manage.py migrate
```

## Setup NodeJS and install dependencies
```shell
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.3/install.sh | bash
$ nvm install 8.6
$ nvm use 8.6
$ npm install -g yarn
$ yarn install
```

# Development server

Run `yarn dev:start` to start the development server then navigate to http://localhost:4300/.

NOTE: The app will automatically reload if you change any of the source files (using webpack hmr).

## Test
Run `yarn test:all` to test the entire project.

See `package.json#scripts` and `python manage.py --help` for all available commands.
