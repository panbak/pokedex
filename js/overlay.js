var stats = $('#stats');
var pokedex = $('#pokedex-container');
var id='';

$('#closeStats').on('click', function () {
    stats.slideUp("slow", function () {
        pokedex.slideDown( "slow", function () {
            document.getElementById(id).scrollIntoView(true);
        });
    });
})

const populateStats = function (pokemonId) {
    id = pokemonId;
    pokedex.slideUp("slow", function () {
        stats.slideDown( "slow" );
    });
    fetch('https://pokeapi.co/api/v2/pokemon/'+pokemonId).then(res => res.json()).then( res => {
        pokemon = {
            name: res.name,
            front_default: res.sprites.front_default,
            back_default: res.sprites.back_default,
            front_shiny: res.sprites.front_shiny,
            back_shiny: res.sprites.back_shiny,
            height: res.height,
            weight: res.weight,
            types: res.types,
            hp: res.stats[0].base_stat,
            attack: res.stats[1].base_stat,
            defense: res.stats[2].base_stat,
            special_attack: res.stats[3].base_stat,
            special_defense: res.stats[4].base_stat,
            speed: res.stats[5].base_stat
        };
        let types='';
        pokemon.types.forEach((item,index)=>{
            types+='<span class="m-2 mx-auto badge '+item.type.name+'">'+item.type.name+'</span>';
        });
        $('#pokemon').text(pokemon.name.charAt(0).toUpperCase()+pokemon.name.slice(1));
        $('#height').text(pokemon.height);
        $('#weight').text(pokemon.weight);
        $('#types').html(types);
        $('#front_default img').attr('src',pokemon.front_default);
        $('#back_default img').attr('src',pokemon.back_default);
        $('#front_shiny img').attr('src',pokemon.front_shiny);
        $('#back_shiny img').attr('src',pokemon.back_shiny);

        $('#hp').text(pokemon.hp);
        $('#attack').text(pokemon.attack);
        $('#defense').text(pokemon.defense);
        $('#special_attack').text(pokemon.special_attack);
        $('#special_defense').text(pokemon.special_defense);
        $('#speed').text(pokemon.speed);
    });

}