import { useEffect, useState } from 'react'
import '../../App.css'
import axios from 'axios'
import PokeCard from '../../components/PokeCard'
import { useDebounce } from '../../hooks/useDebounce'
import AutoComplete from '../../components/AutoComplete'

function MainPage() {
  const [allpokemons, setAllpokemons] = useState([]);
  const [displayedPokemons, setDisplayedPokemons] = useState([]);
  const limitNum = 20;
  
  const url = `https://pokeapi.co/api/v2/pokemon/?limit=1008&offset=0`;
  
  // const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(()=>{
    fetchPokemonData();
  },[])

  // useEffect(()=>{
  //   handleSearchInput(debouncedSearchTerm);
  // }, [debouncedSearchTerm])

  const filterDisplayedPokemonData = (allpokemonsData, displayedPokemons = []) => {
    const limit = displayedPokemons.length + limitNum;
    const array = allpokemonsData.filter((pokemon, index) => index + 1 <= limit)
    return array;
  }

  const fetchPokemonData = async () => {
    try{
      const response = await axios.get(url);
      setAllpokemons(response.data.results);
      setDisplayedPokemons(filterDisplayedPokemonData(response.data.results));
    } catch(error){
      console.error(error);
    }
  }

  // const handleSearchInput = async (searchTerm) => {
    
  //   if(searchTerm.length > 0){
  //     try{
  //       const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`);
  //       const pokemonData = {
  //         url: `https://pokeapi.co/api/v2/pokemon/${response.data.id}`,
  //         name: searchTerm
  //       }
  //       setPokemons( [pokemonData] );
  //     }catch(error){
  //       setPokemons([]);
  //       console.error(error);
  //     }
  //   } else {
  //     fetchPokemonData(true);
  //   }
  // }

  return (
    <article className='pt-6'>
      <header className='flex flex-col gap-2 w-full px-4 z-50'>
        <AutoComplete
          allpokemons={allpokemons}
          setDisplayedPokemons={setDisplayedPokemons}
        />
      </header>
      <section className='pt-6 flex flex-col justify-content items-center overflow-auto z-0'>
        <div className='flex flex-row flex-wrap gap-[16px] items-center justify-center px-2 max-w-4xl '>
          {displayedPokemons.length > 0 ? 
          (
            displayedPokemons.map(({url,name}) => (<PokeCard key={url} url={url} name={name}/>))
            
          ) : (
            <h2 className='font-medium text-lg text-slate-900 mb-1'>포켓몬이 없습니다.</h2>
          )}
        </div>
      </section>
      <div className='text-center'>
        {(allpokemons.length > displayedPokemons.length) && (displayedPokemons.length !== 1) && 
        (<button
          onClick={()=>{setDisplayedPokemons(filterDisplayedPokemonData(allpokemons, displayedPokemons))}} 
          className='bg-slate-800 px-6 py-2 my-4 text-base rounded-lg font-bold text-white'>
          더 보기
        </button>)}
        
      </div>
    </article>
  )
}

export default MainPage
