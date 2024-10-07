import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// IMPORT CSS
import './login.css'

function Login(){
    return(
    
        <div className="login-form">
            <Form>
                <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter Username" />
                </Form.Group>
                <div class="form-input">
                    <Button variant="primary" id="join-user">Join</Button>
                </div>
            </Form>
        </div>

    )
}

export default Login