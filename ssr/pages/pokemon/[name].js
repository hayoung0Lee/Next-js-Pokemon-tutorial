import { useRouter } from 'next/router' 
import axios from 'axios';
import { useQuery } from 'react-query';
import Head from 'next/head'
import { Container, FormControl, Row, Col, Card } from 'react-bootstrap'

const getPokemon = async (key, q) => {
  const { data } = await axios.get(`http://localhost:3000/api/pokemon?name=${escape(q)}`);
  return data;
}

export async function getServerSideProps(context) {
    const data = await getPokemon(null, context.params.name);
    return {
        props: {
            data: data
        }
    }
}

export default function Name ({data}) {
    const router = useRouter();
    // const { data } = useQuery(["name", router.query.name], getPokemon);
    return (
    <div>
        <Head>
            <title>{(data && data.name.english) || "Pokemon"}</title>
        </Head>
        <Container>
            {data && 
            <>
                <h1>{data.name.english}</h1>
                <Row>
                    <Col xs={4}>
                        <img src={`/pokemon/${data.name.english.toLowerCase().replace(" ", "-")}.jpg`}
                        style={{width: "100%"}} />
                    </Col>
                </Row>
            </>}
        </Container> 
    </div>)
}