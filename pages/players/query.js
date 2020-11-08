import Head from 'next/head'
import { useState, useEffect } from 'react'
import styles from '../../styles/Player.module.css'

const Player = ({
    result,
    searchParams
}) => {
    return (
        <main className={styles.main}>
            <h1 className={styles.title}>Search results for {searchParams.condition} ({searchParams.readableFilterOperator}) {searchParams.query}, ordered {searchParams.order}</h1>
            {result && result.map((player, index) => (
                <a
                    className={styles.playerContainer}
                    href={`https://liquipedia.net/leagueoflegends/${player.pagename}`}
                    target='_blank'
                    rel='noopener noreferrer'
                    key={index}
                >
                    <div>
                        <div className={styles.innerContainer}>
                            <div>
                                <div className={styles.playerName}>{player.id} ({player.name})</div>
                                {player.team ? <div>{player.team}</div> : "Free Agent"}
                            </div>
                            <div className={styles.rightSide}>
                                <div>{player.nationality}</div>
                                <div>Earnings: ${player.earnings}</div>
                            </div>
                        </div>
                    </div>
                </a>
            ))}
        </main>
    )
}

Player.getInitialProps = async(ctx) => {
    const { condition, filterOperator, order, query } = ctx.query

    const apikey = process.env.NEXT_PUBLIC_LIQUIPEDIA_API_KEY
    const form = new URLSearchParams({
        'wiki': 'leagueoflegends',
        'limit': 8,
        'apikey': apikey,
        'conditions': filterOperator !== 'All' ? `[[${condition}${filterOperator}${query}]]` : '',
        'order': `${condition} ${order}`
    })
    const res = await fetch("https://api.liquipedia.net/api/v1/player", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept-Encoding': 'gzip, deflate, br'
        },
        body: form
    })
    const result = await res.json()

    return { result: result?.result, searchParams: ctx.query }
}

export default Player
