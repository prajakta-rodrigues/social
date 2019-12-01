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
alias Social.Connections.Connection
alias Social.Configs.Config

pw = Argon2.hash_pwd_salt("password")
date = ~D[1999-05-18]

usernames = [
  "engagingunhinge",
  "humorousprong",
  "blathersperky",
  "runiefetch",
  "riflemiscreant",
  "camcorderneatly",
  "geniusderby",
  "mankindsmake",
  "amplifierslip",
  "exaltationashamed",
  "hatcherywaals",
  "campuscathedral",
  "llewelynline",
  "opulentlycompromise",
  "followingcool",
  "equivocatechoir",
  "karatedavy",
  "ethiopianbaseball",
  "updateeffects",
  "particularrift",
  "londondray",
  "mythimpressive",
  "hostilerates",
  "rompconan",
  "marquisace",
  "earnestcavernous",
  "comicplanck",
  "harnessglen",
  "darkishpedigree",
  "gelsdwelling",
  "piperrecently",
  "johnslila",
  "smackblast",
  "careenattach",
  "tingleyblackwell",
  "fencemobile",
  "sturdilyhalftime",
  "thirstilylesser",
  "lightscoaming",
  "goodsjailer",
  "throngsubscript",
  "shunderyavalanche",
  "studycoathanger",
  "regretbickled",
  "disinfectflail",
  "camillapostcard",
  "hisnonce",
  "batsbroken",
  "dadsecular",
  "frostycomet",
]

lat = 42.3474498
lng = -71.0854208

Enum.each(usernames, fn username ->
  Repo.insert!(%User{name: username, username: username, email: username <> "@test.com", dob: date, password_hash: pw, latitude: lat, longitude: lng})
end)

Repo.insert!(%User{name: "Test", username: "test", email: "test@test.com", dob: date, password_hash: pw, latitude: 42.3476498, longitude: -71.0854208})
Repo.insert!(%User{name: "Test1", username: "test1", email: "test1@test.com", dob: date, password_hash: pw, latitude: 42.3474498, longitude: -71.0856208})
Repo.insert!(%User{name: "Test2", username: "test2", email: "test2@test.com", dob: date, password_hash: pw, latitude: 42.3476498, longitude: -71.0856208})
Repo.insert!(%User{name: "Test3", username: "test3", email: "test3@test.com", dob: date, password_hash: pw, latitude: 42.3474598, longitude: -71.0854208})
Repo.insert!(%User{name: "Test4", username: "test4", email: "test4@test.com", dob: date, password_hash: pw, latitude: 42.3476498, longitude: -71.0854208})
Repo.insert!(%User{name: "Test5", username: "test5", email: "test5@test.com", dob: date, password_hash: pw, latitude: 42.3474498, longitude: -71.0856208})
Repo.insert!(%User{name: "Test6", username: "test6", email: "test6@test.com", dob: date, password_hash: pw, latitude: 42.3476498, longitude: -71.0856208})
Repo.insert!(%User{name: "Test7", username: "test7", email: "test7@test.com", dob: date, password_hash: pw, latitude: 42.3474598, longitude: -71.0854208})
Repo.insert!(%Connection{status: "ACCEPTED", user1_id: 1, user2_id: 2, requester_id: 1})
Repo.insert!(%Connection{status: "ACCEPTED", user1_id: 1, user2_id: 3, requester_id: 1})
Repo.insert!(%Connection{status: "ACCEPTED", user1_id: 2, user2_id: 3, requester_id: 1})
Repo.insert!(%Connection{status: "ACCEPTED", user1_id: 2, user2_id: 4, requester_id: 1})
Repo.insert!(%Connection{status: "PENDING", user1_id: 1, user2_id: 4, requester_id: 1})
Repo.insert!(%Config{property: "interests", property_values: ["Dancing", "Music", "Singing", "Movies", "Sports", "Computers"]})
Repo.insert!(%Config{property: "sports", property_values: ["Soccer", "Chess", "Badminton", "Baseball", "Swimming"]})
Repo.insert!(%Config{property: "movies", property_values: ["Thriller", "RomCom", "SciFic"]})
