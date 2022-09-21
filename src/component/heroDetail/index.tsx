import { ApolloError, useLazyQuery, useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { VOTE_HERO } from 'src/graphql/mutations/hero';
import { GET_HERO_DETAILS } from 'src/graphql/queries/hero';
import AuthService from 'src/services/authService';

const HeroDetail = () => {
    let { id } = useParams();
    const navigate = useNavigate();
    const [liked, setLiked] = useState(false);
    const [totalLike, setTotalLike] = useState(0);
    const { loading, error, data, refetch } = useQuery(GET_HERO_DETAILS, { variables: { "heroId": id } });
    const [voteHero, { error: errorVoteHero, data: dataVotedHero }] = useMutation(VOTE_HERO, { errorPolicy: 'all' });
    const isLogin = AuthService.isLoggedIn();
    const handleLikeHero = async (heroId: string) => {
        console.log(heroId);
        if (isLogin) {
            if (!liked) {
                const rs: any = await voteHero({
                    variables: { "heroId": heroId }
                });
                if (rs?.data) {
                    setLiked(!liked);
                    refetch({ "heroId": id });
                } else {
                    alert(rs?.errors.map((err: any) => err.message).join(', '))
                }
            }
        } else {
            alert("Please sign in to vote");
            navigate('/sign-in');
        }
    }

    useEffect(() => {
        if (data) {
            setTotalLike(data?.hero?.usersVoted?.length);
        }
    }, [data])
    return (
        <div className="hero-item">
            {
                data && <div className='hero-item_content'>
                    <img src={data.hero.image ? data.hero.image : 'https://picsum.photos/400/200'} alt={data.hero.name} />
                    <div className="hero-item_content-infor">
                        <div className='name'>
                            <p>{data.hero.alterEgo}</p>
                            <p>{data.hero.realName}</p>
                        </div>
                        <div className="like">
                            <p>{totalLike}</p>
                            <svg onClick={() => handleLikeHero(data.hero.id)} className={liked ? 'liked' : ''} width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#8899a4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                        </div>
                    </div>
                </div>
            }
            <Button type="button" onClick={() => navigate(-1)}>Go back</Button>
        </div>
    );
};

export default HeroDetail;