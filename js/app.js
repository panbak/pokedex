var nextUrl = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20';
var fetching = false;
const fetchPokemon = () => {
    const promises = [];
    /*for (let i = 150; i <= 250; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then( res => res.json() ));
    }*/
    console.log(nextUrl);
    fetch(nextUrl).then(res => res.json()).then( res => {
        nextUrl = res.next;
        res.results.forEach((item, index)=>{
            promises.push(fetch(item.url).then( res => res.json() ));
        });

        Promise.all(promises).then( results => {
            let pokemons = results.map( result => ({
                name: result.name,
                image: result.sprites.other['official-artwork']['front_default'],
                type: result.types.map((type) => type.type.name),
                id: result.id
            }));
            drawPokemonCards(pokemons);
        }).then(res => {
            fetching = false;
        });
    });

}

const drawPokemonCards = (pokemons) => {
    let style = document.createElement('style');
    pokemons.forEach((pokemon,index)=>{
        let styleCss = '';
        let className = generateRandomClass();
        pokemon.types = '';
        styleCss = '.'+className+'{ background: linear-gradient(to bottom right';
        pokemon.type.forEach((item,index)=>{
            styleCss+=', var(--'+item+')';
            if(pokemon.type.length==1){
                styleCss+=', var(--'+item+')';
            }
            pokemon.types+='<span class="m-1 badge '+item+'">'+item+'</span>';
        });
        styleCss+='); }';
        style.innerHTML += styleCss;
        document.getElementsByTagName('head')[0].appendChild(style);
        let card = '<div class="col-lg-3 col-md-4 col-sm-6 col-xs-6 col-6"><div id="'+pokemon.id+'" class="card poke-card '+className+' m-2" data-id="'+pokemon.id+'"> <img class="mx-auto" src="'+pokemon.image+'"> <div class="poke-name mb-2">'+pokemon.name.charAt(0).toUpperCase()+pokemon.name.slice(1)+'</div> <div class="card-footer"> '+pokemon.types+' </div> </div></div>'

        document.getElementById('pokedex').innerHTML+=card;

    });
    generateEventListeners();
}

const generateEventListeners = () => {
    let cards = document.getElementsByClassName('poke-card');
    Array.from(cards).forEach(function(card) {
        card.addEventListener('click', function () {
            populateStats(this.getAttribute('data-id'));
        });
    });
}


window.onscroll = function() {
    let totalPageHeight = document.body.scrollHeight;
    let scrollPoint = window.scrollY + window.innerHeight;
    if(totalPageHeight-scrollPoint<10 && !fetching){
        fetching = true;
        fetchPokemon();
    }
}


const generateRandomClass = function(){
    return 'class_'+Math.random().toString(20).substr(2, 6);
}



fetchPokemon();
