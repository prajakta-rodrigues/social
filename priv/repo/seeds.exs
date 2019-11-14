# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Social.Repo.insert!(%Social.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias Social.Repo
alias Social.Users.User

pw = Argon2.hash_pwd_salt("password")
date = ~D[1999-05-18]

Repo.insert!(%User{name: "Test", username: "test", email: "test@test.com", dob: date, password_hash: pw, password: "password"})