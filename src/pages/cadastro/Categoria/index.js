import React, { useState, useEffect } from 'react'
import PageDefault from '../../../components/PageDefault'
import { Link } from 'react-router-dom'
import FormField from '../../../components/FormField'
import Button from '../../../components/Button'

const CadastroCategoria = () => {
	const valoresIniciais = {
		nome: '',
		descricao: '',
		cor: '',
	}

	const [categorias, setCategorias] = useState([])
	const [values, setValues] = useState(valoresIniciais)

	//função criada por nós para manusear os setValues a partir de qualquer campo que queiramos alterar
	function setValue(chave, valor) {
		//chave = nome, descricao, cor, blá blá blá
		// valor = Henry, é zika, #201526
		setValues({
			...values,
			[chave]: valor,
		})
	}

	const handleChange = (e) => {
		setValue(e.target.getAttribute('name'), e.target.value)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		setCategorias([...categorias, values])

		setValues(valoresIniciais)
	}

	useEffect(() => {
		const URL = 'http://localhost:8080/categorias'

		fetch(URL).then(async (response) => {
			const resposta = await response.json()
			console.log(resposta)
			setCategorias([...resposta])
		})
	}, [])

	// useEffect(() => {
	// 	setTimeout(() => {
	// 		setCategorias([
	// 			...categorias,
	// 			{
	// 				id: 1,
	// 				nome: 'Front End',
	// 				descricao: 'Uma categoria Bacanuda',
	// 				cor: '#6bd1ff',
	// 			},
	// 			{
	// 				id: 2,
	// 				nome: 'Back End',
	// 				descricao: 'Uma categoria Bacanuda',
	// 				cor: '#6bd1ff',
	// 			},
	// 		])
	// 	}, 3000)
	// }, [])

	return (
		<PageDefault>
			<h1>Cadastro de Categoria: {values.nome}</h1>

			<form onSubmit={handleSubmit}>
				<div>
					<FormField
						label="Nome da categoria:"
						type="text"
						value={values.nome}
						name="nome"
						onChange={handleChange}
					/>
					<FormField
						label="Descrição:"
						type="textarea"
						value={values.descricao}
						name="descricao"
						onChange={handleChange}
					/>
					<FormField
						label="Cor:"
						type="color"
						value={values.cor}
						name="cor"
						onChange={handleChange}
					/>
				</div>
				<Button>Cadastrar</Button>
			</form>
			{/* {console.log('[categorias]', categorias)} */}
			{categorias.length === 0 && <div>Loading...</div>}
			<ul>
				{categorias.map((categoria, index) => {
					return <li key={`${categoria.nome}${index}`}>{categoria.nome}</li>
				})}
			</ul>

			<Link to="/">Ir para Home</Link>
		</PageDefault>
	)
}

export default CadastroCategoria
