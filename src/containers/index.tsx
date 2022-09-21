import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import Hero from 'src/component/hero';
import { GET_LIST_HEROS } from 'src/graphql/queries/hero';

const Layout = () => {
    const { loading, error, data } = useQuery(GET_LIST_HEROS, { fetchPolicy: 'no-cache'});
    
    const [listHeros, setListHeros] = useState([]);
    if (error) {
        console.log(error);
    }
    const getDataHeros = () => {
        if (data) {
            const _listHeros = data.searchHeroes.edges.map((edge: any) => edge.node);
            setListHeros(_listHeros);
        } else {
            setListHeros([]);
        }
    }

    useEffect(() => {
        getDataHeros();
        console.log(listHeros);
    }, [data])
    return (
        <>
            <Hero listHeros={listHeros} />
        </>
    )
}

export default Layout;