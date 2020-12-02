import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Container, FormControl, Row, Col, Card } from 'react-bootstrap'
import axios from 'axios';
import { useQuery } from 'react-query';

const getPokemon = async (key, q) => {
  const { data } = await axios.get(`/api/search?q=${escape(q)}`);
  return data.map((pokemon) => ({
    ...pokemon,
    image: `/pokemon/${pokemon.name.english.toLowerCase().replace(" ", "-")}.jpg`
  }));
}

export default function Home() {
  const [query, setQuery] = useState('');
  const { data } = useQuery(["q", query], getPokemon);
  return (
    <div className="container">
      <Head>
        <title>Pokemon</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <FormControl 
        placeholder="Search"
        aria-label="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        />
        <div>
          {data && (
            <Row>
              {data.map(({id, name, type, image}) => {
                return (
                <Col xs={4} key={id} style={{ padding: 5}}>    
                  <Link href={`/pokemon/${name.english}`}>  
                    <Card>
                      <Card.Img variant="top" src={image} style={{maxHeight: 300}}/>
                      <Card.Body>
                        <Card.Title>{name.english}</Card.Title>
                        <Card.Text>{type?.join(", ")}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Link>  
                </Col>
              )})}
            </Row>          
            )}
        </div>
      </Container>
    </div>
  )
}
