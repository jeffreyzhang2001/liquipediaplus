import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import styles from '../styles/Home.module.css'
import { Button, Input, Dropdown, Menu } from 'antd'
import { DownOutlined } from '@ant-design/icons';

export default function Home() {
	const router = useRouter()

	const [queryCategory, setQueryCategory] = useState('Player/Coach')
	const queryCategoryMenu = (
		<Menu>
	  		<Menu.Item onClick={() => setQueryCategory('Player/Coach')}>Player/Coach</Menu.Item>
	  		<Menu.Item onClick={() => setQueryCategory('Team')}>Team</Menu.Item>
			<Menu.Item onClick={() => setQueryCategory('Tournament')}>Tournament</Menu.Item>
		</Menu>
	)
	useEffect(() => {
		if (queryCategory == 'Player/Coach') {
			setQueryCondition('Gamer ID')
		} else if (queryCategory == 'Team') {
			setQueryCondition('Region')
		} else if (queryCategory == 'Tournament') {
			setQueryCondition('Patch')
		}
	}, [queryCategory])

	const [queryCondition, setQueryCondition] = useState('Gamer ID')
	const queryConditionMenu = () => {
		if (queryCategory === 'Player/Coach') {
			return (
				<Menu>
					<Menu.Item onClick={() => setQueryCondition('Gamer ID')}>Gamer ID</Menu.Item>
					<Menu.Item onClick={() => setQueryCondition('Name')}>Name</Menu.Item>
					<Menu.Item onClick={() => setQueryCondition('Romanized name')}>Romanized name</Menu.Item>
					<Menu.Item onClick={() => setQueryCondition('Birthday')}>Birthday</Menu.Item>
					<Menu.Item onClick={() => setQueryCondition('Region')}>Region</Menu.Item>
					<Menu.Item onClick={() => setQueryCondition('Nationality')}>Nationality</Menu.Item>
					<Menu.Item onClick={() => setQueryCondition('Status')}>Status</Menu.Item>
					<Menu.Item onClick={() => setQueryCondition('Role')}>Role</Menu.Item>
					<Menu.Item onClick={() => setQueryCondition('Earnings')}>Earnings</Menu.Item>
					<Menu.Item onClick={() => setQueryCondition('Team')}>Team</Menu.Item>
				</Menu>
			)
		} else if (queryCategory === 'Team') {
			return (
				<Menu>
					<Menu.Item onClick={() => setQueryCondition('Name')}>Name</Menu.Item>
					<Menu.Item onClick={() => setQueryCondition('Region')}>Region</Menu.Item>
					<Menu.Item onClick={() => setQueryCondition('Location')}>Location</Menu.Item>
					<Menu.Item onClick={() => setQueryCondition('Creation date')}>Creation date</Menu.Item>
					<Menu.Item onClick={() => setQueryCondition('Earnings')}>Earnings</Menu.Item>
				</Menu>
			)
		} else if (queryCategory === 'Tournament') {
			return (
				<Menu>
					<Menu.Item onClick={() => setQueryCondition('Name')}>Name</Menu.Item>
					<Menu.Item onClick={() => setQueryCondition('Series')}>Series</Menu.Item>
					<Menu.Item onClick={() => setQueryCondition('Patch')}>Patch</Menu.Item>
					<Menu.Item onClick={() => setQueryCondition('Organizer')}>Organizer</Menu.Item>
					<Menu.Item onClick={() => setQueryCondition('Location')}>Location</Menu.Item>
					<Menu.Item onClick={() => setQueryCondition('Venue')}>Venue</Menu.Item>
					<Menu.Item onClick={() => setQueryCondition('Start date')}>Start date</Menu.Item>
					<Menu.Item onClick={() => setQueryCondition('End date')}>End date</Menu.Item>
					<Menu.Item onClick={() => setQueryCondition('Prize pool')}>Prize pool</Menu.Item>
				</Menu>
			)
		}
	}

	const [filterBy, setFilterBy] = useState('All')
	const filterByMenu = (
		<Menu>
	  		<Menu.Item onClick={() => setFilterBy('All')}>All</Menu.Item>
	  		<Menu.Item onClick={() => setFilterBy('==')}>==</Menu.Item>
			<Menu.Item onClick={() => setFilterBy('!=')}>!=</Menu.Item>
			<Menu.Item onClick={() => setFilterBy('>')}>{'>'}</Menu.Item>
			<Menu.Item onClick={() => setFilterBy('<')}>{'<'}</Menu.Item>
		</Menu>
	)

  	const [orderBy, setOrderBy] = useState('Descending')
  	const orderByMenu = (
		<Menu>
			<Menu.Item onClick={() => setOrderBy('Ascending')}>Ascending</Menu.Item>
			<Menu.Item onClick={() => setOrderBy('Descending')}>Descending</Menu.Item>
		</Menu>
	)

  	const [query, setQuery] = useState()

	const performQuery = () => {
		let condition
		if (queryCondition === 'Gamer ID') {
			condition = 'id'
		} else {
			condition = queryCondition.toLowerCase().replace(' ', '')
		}

		let filterOperator
		if (filterBy === 'All') {
			filterOperator = 'All'
		} else if (filterBy === '==') {
			filterOperator = '::'
		} else if (filterBy === '!=') {
			filterOperator = '::!'
		} else if (filterBy === '>') {
			filterOperator = '::>'
		} else if (filterBy === '<') {
			filterOperator = '::<'
		}

		let order
		if (orderBy === 'Ascending') {
			order = 'ASC'
		} else {
			order = 'DESC'
		}

		if (queryCategory == 'Player/Coach') {
			router.push({
				pathname: '/players/query',
				query: {
					condition,
					readableFilterOperator: filterBy,
					filterOperator,
					order,
					query
				}
			})
			setTimeout(() => {
				router.reload()
			}, 350)
		} else if (queryCategory == 'Team') {
			router.push({
				pathname: '/players/[player]',
				query: { pid: post.id }
			})
		} else if (queryCategory == 'Tournament') {
			router.push({
				pathname: '/players/[player]',
				query: { pid: post.id }
			})
		}
	}

  	return (
		<div className={styles.container}>
			<main className={styles.main}>
				<div className={styles.mainText}>
					<h1 className={styles.title}>Liquipedia+</h1>
					<h2 className={styles.subTitle}>
						A visual query writing tool for esport statistic enthusiasts
					</h2>
				</div>

				<div className={styles.searchbar}>
					<Dropdown overlay={queryCategoryMenu} trigger={['click']}>
						<Button className={styles.dropdownButton}>
							{queryCategory} <DownOutlined />
						</Button>
					</Dropdown>
					<Dropdown overlay={queryConditionMenu} trigger={['click']}>
						<Button className={styles.dropdownButton}>
							Query for: {queryCondition} <DownOutlined />
						</Button>
					</Dropdown>
					<Dropdown overlay={orderByMenu} trigger={['click']} disabled={filterBy == '=='}>
						<Button className={styles.dropdownButton}>
							{orderBy} <DownOutlined />
						</Button>
					</Dropdown>
					<Dropdown overlay={filterByMenu} trigger={['click']}>
						<Button className={styles.dropdownButton}>
							Filter by: {filterBy} <DownOutlined />
						</Button>
					</Dropdown>
					<Input
						onChange={(e) => setQuery(e.target.value)}
						className='playerSearch'
						disabled={filterBy === 'All'}
					/>
					<Button type='primary' onClick={performQuery}>
						Search
					</Button>
				</div>

				<a
					href='https://www.teamliquid.com/'
					target='_blank'
					rel='noopener noreferrer'
				>
					<img
						className={styles.liquidLogo}
						src='https://snagfilms-a.akamaihd.net/68/0e/09ccf7e54e079e59fe4365e0fff8/teamliquid-logo-thumbnail-300x300-transp-bckgd.png'
					/>
				</a>
			</main>

			<footer className={styles.footer}>
				<a
					href='https://liquipedia.net/'
					target='_blank'
					rel='noopener noreferrer'
				>
					Powered by Liquipedia
				</a>
			</footer>
		</div>
  	)
}
