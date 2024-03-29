'use client';

import { useEffect,useState } from "react";
import HKLibraryAPI from "@/app/services/HKLibraryApi";

import ExplorerBookGrid from "../components/explorer/ExplorerBookGrid";
import ExplorerButtonGrid from "../components/explorer/ExplorerButtonGrid";
import { BOOKS_NOT_FOUND } from "../components/bookCardGrid/bookCardGrid";
import { CustomH1 } from "../components/utils/utils";

export default function Genres(){
    const [genres, setGenres] = useState([]);
    const [showBtnGrid, setShowBtnGrid] = useState(true);
    const [genreBooks, setGenreBooks] = useState([]);
    const [genreName, setGenreName] = useState("");

    function placeBooksInGrid(fetchedBooks){
        if(fetchedBooks.length>0){
            setGenreBooks(fetchedBooks);
        }else{
            setGenreBooks(BOOKS_NOT_FOUND);
        }
    }

    function searchBooksFromGenre(id){
        const api = new HKLibraryAPI();
        api.getGenre(id)
            .then( data => {
                placeBooksInGrid(data.libros);
                setGenreName(data.nombre_genero);
            });
            setShowBtnGrid(false)
    }

    function backToBtnGrid(){
        setShowBtnGrid(true)
        setGenreBooks([]);
        setGenreName("");
    }

    function showGenres(){
        const api = new HKLibraryAPI();
        api.getGenres() 
            .then(data => {
                const genres = data.map(genre => {
                    return {
                      id: genre.id,
                      display: `${genre.nombre_genero}`
                    };
                });
                setGenres(genres);
            });
            
    }
    useEffect(() => showGenres(),[]);
    return (
        <>
            {(showBtnGrid)?(
                <ExplorerButtonGrid infoForButtons={genres} searchBooks={searchBooksFromGenre}>
                    <CustomH1>Generos</CustomH1>
                </ExplorerButtonGrid>
            ):(
                <ExplorerBookGrid books={genreBooks} onClickBackBtn={() => backToBtnGrid()}>
                    <CustomH1>Libros del género {genreName} </CustomH1>
                </ExplorerBookGrid>
            )}
        </>
    );
}