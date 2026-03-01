import requests

base_url = "https://pokeapi.co/api/v2/"

def get_pokemon(name):
    url = f"{base_url}pokemon/{name}"
    response = requests.get(url)
   
    if response.status_code == 200:  # Fixed indentation
       pokemon_data = response.json()
       return pokemon_data
    else:
        print(f"Pokemon '{name}' not found! Check the name and try again.")

def display_pokemon(pokemon_info):
    print("=" * 30)
    print(f"Name    : {pokemon_info['name'].capitalize()}")
    print(f"ID      : {pokemon_info['id']}")
    print(f"Height  : {pokemon_info['height'] / 10} m")
    print(f"Weight  : {pokemon_info['weight'] / 10} kg")
    print(f"Types   : {', '.join([t['type']['name'].capitalize() for t in pokemon_info['types']])}")
    print("\nBase Stats:")
    for stat in pokemon_info['stats']:
        print(f"  {stat['stat']['name'].capitalize():<20}: {stat['base_stat']}")
    print("=" * 30)

while True:
    pokemon_name = input("\nEnter a Pokemon name (or 'quit' to exit): ")
    
    if pokemon_name.lower() == 'quit':
        print("Goodbye!")
        break

    pokemon_info = get_pokemon(pokemon_name)

    if pokemon_info:
        display_pokemon(pokemon_info)