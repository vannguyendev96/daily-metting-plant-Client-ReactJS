import React, { Component } from 'react';
import { Button, Card, CardBody,Alert, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from 'axios';
import { URL_API } from '../../../constant'

class Register extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      username: '',
      isPasswordFailed: false,
      isPasswordSuccess: false,
      isEmail: false,
      errorEmail: '',
      isRegister: false,
      errorRegister: 'Vui lòng điền đúng thông tin!'
    }
    this.checkPassword = this.checkPassword.bind(this);
    this.checkEmail = this.checkEmail.bind(this);
    this.register = this.register.bind(this);
  }

  //check validate password
  checkPassword(e){
    if(this.state.password === e.target.value){
      this.setState({
        isPasswordFailed: true
      })
    }
    else{
      this.setState({
        isPasswordSuccess: true
      })
    }
  }

  //check email
  async checkEmail(e){
    this.setState({
      email: e.target.value
    })
    //call api check email 
    await axios.post(URL_API + 'users/checkemail',{
      email: e.target.value,
      password: 'checkemail',
      username: 'checkemail'
    })
    .then((response) =>{
      if(response.status === 200)
      {
          if(response.data.message === "Bạn có thể sử dụng email này"){
            this.setState({
              isEmail: true,
              errorEmail: "Bạn có thể sử dụng email này!"
            })
          }
          else if(response.data.message === "Email này đã tồn tại"){
            this.setState({
              isEmail: false,
              errorEmail: "Email này đã tồn tại!"
            })
          }
          else{
            this.setState({
              isEmail: false,
              errorEmail: "Email không hợp lệ!"
            })
          }
      }
    })
  }

  async register(){
    const { email,password,username} = this.state;
    if(this.state.isEmail === true && this.state.isPasswordFailed === true && this.state.isPasswordSuccess === true){
      await axios.post(URL_API+ 'users/signup',{
        email: email,
        password: password,
        username: username
      }).then((response) => {
        if(response.status === 200){
          this.setState({
            errorRegister: 'Đăng kí thành công!',
            isRegister: true
          })
          this.props.history.push('/login');
          //localStorage.setItem('token',response.data.token)
        }
        else{
          this.setState({
            errorRegister: 'Đã xảy ra lỗi, vui lòng liên hệ ADMIN!',
            isRegister: false
          })
        }
      })
    }
    else{
      this.setState({
        errorRegister: 'Vui lòng điền đúng thông tin!',
        isRegister: false
      })
    }
  }



  
  render() {

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Username" autoComplete="username" 
                        onChange={ (e) => this.setState({username: e.target.value})}/>
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Email" autoComplete="email" 
                        onChange={ (e) => this.checkEmail(e)}/>
                    </InputGroup>

                    { (this.state.isEmail && this.state.email !=="") ?
                        <Row>
                          <Col xs="12" md="12">
                            <Alert color="success">
                              {this.state.errorEmail}
                            </Alert>
                          </Col>
                        </Row> : null } 
                    { (!this.state.isEmail && this.state.email !=="") ?
                        <Row>
                          <Col xs="12" md="12">
                            <Alert color="danger">
                              {this.state.errorEmail}
                            </Alert>
                          </Col>
                        </Row> : null } 
                    
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Password" autoComplete="new-password" 
                        onChange={ (e) => this.setState({password: e.target.value})}/>
                    </InputGroup>

                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Repeat password" autoComplete="new-password" 
                        onChange={ (e) => this.checkPassword(e)}/>
                    </InputGroup>

                    { (!this.state.isPasswordFailed && this.state.password !=="") ?
                        <Row>
                          <Col xs="12" md="12">
                            <Alert color="danger">
                              Password chưa đúng!
                            </Alert>
                          </Col>
                        </Row> : null } 

                    { (this.state.isPasswordSuccess && this.state.password !=="") ?
                        <Row>
                          <Col xs="12" md="12">
                            <Alert color="success">
                              Bạn có thể sử dụng password này!
                            </Alert>
                          </Col>
                        </Row> : null } 

                    <Button onClick ={this.register} color="success" block>Create Account</Button>
                    { (this.state.isRegister) ?
                        <Row>
                          <Col xs="12" md="12">
                            <Alert color="success">
                              {this.state.errorRegister}
                            </Alert>
                          </Col>
                        </Row> : null } 
                    { (!this.state.isRegister && this.state.password !=="" && this.state.email !=="" && this.state.username !=="") ?
                        <Row>
                          <Col xs="12" md="12">
                            <Alert color="danger">
                              {this.state.errorRegister}
                            </Alert>
                          </Col>
                        </Row> : null }
                  </Form>
                </CardBody>
                {/* <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-facebook mb-1" block><span>facebook</span></Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button className="btn-twitter mb-1" block><span>twitter</span></Button>
                    </Col>
                  </Row>
                </CardFooter> */}
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
