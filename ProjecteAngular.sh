ng new app --skipTests=true --routing=true --style=scss
mkdir app/modules
cd app/src/app

# MODULS
ng g m modules/home
ng g m modules/login
ng g m modules/users


# MODUL HOME
mkdir modules/home/components
mkdir modules/home/pages
ng g c modules/home/components/home
ng g c modules/home/pages/home-page


# MODUL LOGIN
mkdir modules/login/components
mkdir modules/login/pages
ng g c modules/login/components/login-form
ng g p modules/login/pages/login


# MODUL USERS
mkdir modules/users/components
mkdir modules/users/pages
mkdir modules/users/shared

mkdir modules/users/shared/components
mkdir modules/users/shared/guards
mkdir modules/users/shared/helpers
mkdir modules/users/shared/material
mkdir modules/users/shared/models
mkdir modules/users/shared/services

# Components
ng g c modules/users/components/register-form
ng g c modules/users/components/users-list
ng g c modules/users/components/user-details

# Pages
ng g c modules/users/pages/register
ng g c modules/users/pages/users
ng g c modules/users/pages/user

# Shared
ng g c modules/users/shared/components/header
ng g c modules/users/shared/components/hero
ng g c modules/users/shared/components/sidebar
ng g c modules/users/shared/helpers/fake-backend
ng g c modules/users/shared/material/material
ng g s modules/users/shared/services/auth
ng g s modules/users/shared/services/user

yes | ng g g modules/users/shared/guards/auth --



