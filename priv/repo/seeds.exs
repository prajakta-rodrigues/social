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
alias Social.Profiles.Profile

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
  "ArticleSporty",
  "BunnyReal",
  "Cleartcon",
  "Dispade",
  "Eifferer",
  "Euchnoid",
  "Euphraxer",
  "Forthard",
  "FourTweet",
  "GazetteJiggy",
  "Hidaleric",
  "Inloverh",
  "Intraba",
  "Iwantum",
  "Kuroxi",
  "MarsReptile",
  "MatterWin",
  "Notestine",
  "Phoence",
  "RadiantGrand",
  "Rentixio",
  "Reportshe",
  "ShabbyStand",
  "Smokingzo",
  "SpinAim",
  "Suallogo",
  "Tilappsha",
  "Tivingue",
  "Tweddle",
  "UnJewel",
  "Apharapp",
  "Asiatrol",
  "Bamarket",
  "Beecalgo",
  "Bosseer",
  "CaptainWaka",
  "Carding",
  "Chancorn",
  "Darnent",
  "Dricanex",
  "Interein",
  "Locatic",
  "Mentspec",
  "Mesoftvi",
  "Mostopho",
  "MovieTactic",
  "Nkumenbe",
  "Oppostc",
  "PanetSmooth",
  "Peettivi",
  "PhobicDude",
  "Radianer",
  "Roseed",
  "Shadesso",
  "SporkGo",
  "SuaveWarm",
  "Tablocill",
  "TinsToxic",
  "UpInsider",
  "ZinSnowboard",
]

lat = 42.3474498
lng = -71.0854208

sports = ["soccer", "Chess", "Badminton", "Baseball", "Swimming"]
interests = ["Aircraft Spotting" , "Airbrushing" , "Airsofting" , "Acting" , "Aeromodeling" , "Amateur Astronomy" , "Amateur Radio" , "Animals pets dogs" , "Archery" , "Arts" , "Aquarium Freshwater & Saltwater" , "Astrology" , "Astronomy" , "Backgammon" , "Badminton" , "Baseball" , "Base Jumping" , "Basketball" , "Beach Sun tanning" , "Beachcombing" , "Beadwork" , "Beatboxing" , "Becoming A Child Advocate" , "Bell Ringing" , "Belly Dancing" , "Bicycling" , "Bicycle Polo" , "Bird watching" , "Birding" , "BMX" , "Blacksmithing" , "Blogging" , "BoardGames" , "Boating" , "Body Building" , "Bonsai Tree" , "Bookbinding" , "Boomerangs" , "Bowling" , "Brewing Beer" , "Bridge Building" , "Bringing Food To The Disabled" , "Building A House For Habitat For Humanity" , "Building Dollhouses" , "Butterfly Watching" , "Button Collecting" , "Cake Decorating" , "Calligraphy" , "Camping" , "Candle Making" , "Canoeing" , "Cartooning" , "Car Racing" , "Casino Gambling" , "Cave Diving" , "Ceramics" , "Cheerleading" , "Chess" , "Church church activities" , "Cigar Smoking" , "Cloud Watching" , "Coin Collecting" , "Collecting" , "Collecting Antiques" , "Collecting Artwork" , "Collecting Hats" , "Collecting Music Albums" , "Collecting RPM Records" , "Collecting Sports Cards Baseball" , " Football" , " Basketball" , " Hockey" , "Collecting Swords" , "Coloring" , "Compose Music" , "Computer activities" , "Conworlding" , "Cooking" , "Cosplay" , "Crafts" , "Crafts unspecified" , "Crochet" , "Crocheting" , "Cross-Stitch" , "Crossword Puzzles" , "Dancing" , "Darts" , "Diecast Collectibles" , "Digital Photography" , "Dodgeball" , "Dolls" , "Dominoes" , "Drawing" , "Dumpster Diving" , "Eating out" , "Educational Courses" , "Electronics" , "Embroidery" , "Entertaining" , "Exercise aerobics" , " weights" , "Falconry" , "Fast cars" , "Felting" , "Fencing" , "Fire Poi" , "Fishing" , "Floorball" , "Floral Arrangements" , "Fly Tying" , "Football" , "Four Wheeling" , "Freshwater Aquariums" , "Frisbee Golf – Frolf" , "Games" , "Gardening" , "Garage Saleing" , "Genealogy" , "Geocaching" , "Ghost Hunting" , "Glowsticking" , "Gnoming" , "Going to movies" , "Golf" , "Go Kart Racing" , "Grip Strength" , "Guitar" , "Gunsmithing" , "Gun Collecting" , "Gymnastics" , "Gyotaku" , "Handwriting Analysis" , "Hang gliding" , "Herping" , "Hiking" , "Home Brewing" , "Home Repair" , "Home Theater" , "Horse riding" , "Hot air ballooning" , "Hula Hooping" , "Hunting" , "Iceskating" , "Illusion" , "Impersonations" , "Internet" , "Inventing" , "Jet Engines" , "Jewelry Making" , "Jigsaw Puzzles" , "Juggling" , "Keep A Journal" , "Jump Roping" , "Kayaking" , "Kitchen Chemistry" , "Kites" , "Kite Boarding" , "Knitting" , "Knotting" , "Lasers" , "Lawn Darts" , "Learn to Play Poker" , "Learning A Foreign Language" , "Learning An Instrument" , "Learning To Pilot A Plane" , "Leathercrafting" , "Legos" , "Letterboxing" , "Listening to music" , "Locksport" , "Lacrosse" , "Macramé" , "Magic" , "Making Model Cars" , "Marksmanship" , "Martial Arts" , "Matchstick Modeling" , "Meditation" , "Microscopy" , "Metal Detecting" , "Model Railroading" , "Model Rockets" , "Modeling Ships" , "Models" , "Motorcycles" , "Mountain Biking" , "Mountain Climbing" , "Musical Instruments" , "Nail Art" , "Needlepoint" , "Owning An Antique Car" , "Origami" , "Painting" , "Paintball" , "Papermaking" , "Papermache" , "Parachuting" , "Paragliding or Power Paragliding" , "Parkour" , "People Watching" , "Photography" , "Piano" , "Pinochle" , "Pipe Smoking" , "Planking" , "Playing music" , "Playing team sports" , "Pole Dancing" , "Pottery" , "Powerboking" , "Protesting" , "Puppetry" , "Pyrotechnics" , "Quilting" , "Racing Pigeons" , "Rafting" , "Railfans" , "Rapping" , "R C Boats" , "R C Cars" , "R C Helicopters" , "R C Planes" , "Reading" , "Reading To The Elderly" , "Relaxing" , "Renaissance Faire" , "Renting movies" , "Rescuing Abused Or Abandoned Animals" , "Robotics" , "Rock Balancing" , "Rock Collecting" , "Rockets" ,  "Roleplaying" , "Running" , "Saltwater Aquariums" , "Sand Castles" , "Scrapbooking" , "Scuba Diving" , "Self Defense" , "Sewing" , "Shark Fishing" , "Skeet Shooting" , "Skiing" , "Shopping" , "Singing In Choir" , "Skateboarding" , "Sketching" , "Sky Diving" , "Slack Lining" , "Sleeping" , "Slingshots" , "Slot Car Racing" , "Snorkeling" , "Snowboarding" , "Soap Making" , "Soccer" , "Socializing with friends neighbors" , "Speed Cubing rubix cube" , "Spelunkering" , "Spending time with family kids" , "Stamp Collecting" , "Storm Chasing" , "Storytelling" , "String Figures" , "Surfing" , "Surf Fishing" , "Survival" , "Swimming" , "Tatting" , "Taxidermy" , "Tea Tasting" , "Tennis" , "Tesla Coils" , "Tetris" , "Texting" , "Textiles" , "Tombstone Rubbing" , "Tool Collecting" , "Toy Collecting" , "Train Collecting" , "Train Spotting" , "Traveling" , "Treasure Hunting" , "Trekkie" , "Tutoring Children" , "TV watching" , "Ultimate Frisbee" , "Urban Exploration" , "Video Games" , "Violin" , "Volunteer" , "Walking" , "Warhammer" , "Watching sporting events" , "Weather Watcher" , "Weightlifting" , "Windsurfing" , "Wine Making" , "Wingsuit Flying" , "Woodworking" , "Working In A Food Pantry" , "Working on cars" , "World Record Breaking" , "Wrestling" , "Writing" , "Writing Music" , "Writing Songs" , "Yoga" , "YoYo" , "Ziplining" , "Zumba"]
movies = ["Thriller", "RomCom", "SciFic"]
description = ["I am student", "Lorem Ipsum", "Nothing at all", "Today I dont feel like doing anything", "lazy", "Slow Dancing in a burning room", "New Light", "X0X0", "Chillin'"]

Enum.each(usernames, fn username ->
  deviation = :rand.uniform(10000) / 10000
  resp = Repo.insert!(%User{name: username, username: username, email: username <> "@test.com", dob: date, password_hash: pw, latitude: lat + deviation, longitude: lng + deviation})
  Repo.insert!(%Profile{description: Enum.random(description),
      sports: Enum.take_random(sports, 3),
      interests: Enum.take_random(interests, 5),
      movies: Enum.take_random(movies, 2),
      user_id: resp.id
  })
end)

Repo.insert!(%User{name: "Test", username: "test", email: "test@test.com", dob: date, password_hash: pw, latitude: 42.3476498, longitude: -71.0854208})
Repo.insert!(%User{name: "Test1", username: "test1", email: "test1@test.com", dob: date, password_hash: pw, latitude: 42.3474498, longitude: -71.0856208})
Repo.insert!(%User{name: "Test2", username: "test2", email: "test2@test.com", dob: date, password_hash: pw, latitude: 42.3476498, longitude: -71.0856208})
Repo.insert!(%User{name: "Test3", username: "test3", email: "test3@test.com", dob: date, password_hash: pw, latitude: 42.3474598, longitude: -71.0854208})
Repo.insert!(%User{name: "Test4", username: "test4", email: "test4@test.com", dob: date, password_hash: pw, latitude: 42.3476498, longitude: -71.0854208})
Repo.insert!(%User{name: "Test5", username: "test5", email: "test5@test.com", dob: date, password_hash: pw, latitude: 42.3474498, longitude: -71.0856208})
Repo.insert!(%User{name: "Test6", username: "test6", email: "test6@test.com", dob: date, password_hash: pw, latitude: 42.3476498, longitude: -71.0856208})
Repo.insert!(%User{name: "Test7", username: "test7", email: "test7@test.com", dob: date, password_hash: pw, latitude: 42.3474598, longitude: -71.0854208})

conn_status = ["ACCEPTED", "PENDING", "REJECTED"]
Enum.each(usernames, fn username ->
  user1_id = :rand.uniform(50)
  user2_id = :rand.uniform(50) + user1_id
  if user2_id > 118 do
    user2_id = user2_id - 118
    u1 = if user1_id < user2_id, do: user1_id, else: user2_id
    u2 = if user1_id < user2_id, do: user2_id, else: user1_id

    Repo.insert!(%Connection{status: Enum.random(conn_status),
        user1_id: u1,
        user2_id: u2,
        requester_id: u1})
  else
    u1 = if user1_id < user2_id, do: user1_id, else: user2_id
    u2 = if user1_id < user2_id, do: user2_id, else: user1_id
    Repo.insert!(%Connection{status: Enum.random(conn_status),
        user1_id: u1,
        user2_id: u2,
        requester_id: u1})
  end
end)

Repo.insert!(%Config{property: "interests", property_values: interests})
Repo.insert!(%Config{property: "sports", property_values: sports})
Repo.insert!(%Config{property: "movies", property_values: movies})
