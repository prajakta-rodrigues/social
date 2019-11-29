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
alias Social.Configs.Config

pw = Argon2.hash_pwd_salt("password")
date = ~D[1999-05-18]

Repo.insert!(%User{name: "Test", username: "test", email: "test@test.com", dob: date, password_hash: pw, password: "password"})
Repo.insert!(%User{name: "Test1", username: "test1", email: "test1@test.com", dob: date, password_hash: pw, password: "password"})
Repo.insert!(%User{name: "Test2", username: "test2", email: "test2@test.com", dob: date, password_hash: pw, password: "password"})
Repo.insert!(%User{name: "Test3", username: "test3", email: "test3@test.com", dob: date, password_hash: pw, password: "password"})
Repo.insert!(%Config{property: "interests", property_values: ["Dancing", "Music", "Singing", "Movies", "Sports", "Computers"]})
Repo.insert!(%Config{property: "sports", property_values: ["Soccer", "Chess", "Badminton", "Baseball", "Swimming"]})
Repo.insert!(%Config{property: "movies", property_values: ["Thriller", "RomCom", "SciFic"]})
