import React, { Component } from 'react';
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Row,
    Alert,
  } from 'reactstrap';

import axios from 'axios';
import { URL_API } from '../../../constant';
import Skeleton from 'react-loading-skeleton';

import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actions from '../../../actions';

class PlanningYear extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            description: '',
            enddate: '',
            errorName: '',
            errorDescription: '',
            errorDate: '',
            isCreate: false,
            isName: true,
            isDescription: true,
            isEndDate: true,
            isLoading: true,
        }

        this.create = this.create.bind(this);
    }

    async create(){
        const { name,description,enddate,isName,isDescription,isEndDate } = this.state;
        //validate name
        if(name === ""){
            this.setState({
                errorName: 'Tên kế hoạch không được trống!',
                isCreate: false,
                isName: false
            })
        }
        else{
            if(name.length > 50){
                this.setState({
                    errorName: 'Tên kế hoạch không được hơn 50 kí tự !',
                    isCreate: false,
                    isName: false
                }) 
            }
            else{
                this.setState({
                    isName: true
                })
            }
        }

        //validate description
        if(description === ""){
            this.setState({
                errorDescription: 'Diễn giải không được trống!',
                isCreate: false,
                isDescription: false
            })
        }
        else{
            if(description.length > 200){
                this.setState({
                    errorDescription: 'Diễn giải không được trống!',
                    isCreate: false,
                    isDescription: false
                })
            }
            else{
                this.setState({
                    isDescription: true
                })
            }
        }

        //validate data
        if(enddate === ""){
            this.setState({
                errorDate: 'Ngày hoàn thành không được trống',
                isCreate: false,
                isEndDate: false
            })
        }
        else{
            this.setState({
                isEndDate: true
            })
        }

        if(isDescription && isEndDate && isName){
            this.setState({
                isLoading: false
            })
            const token = localStorage.getItem('token');
            await axios.post(URL_API + 'plantyears',
            {
                name,
                description,
                endDate: enddate,
                userid: this.props.userid
            }).then((req) =>{
                console.log(req);
                if(req.status === 200){
                    this.setState({
                        isCreate: true,
                        isLoading: true
                    })
                }
            }).catch(error =>{
                this.setState({
                    isCreate: false,
                    isLoading: true
                })
            })
            
        }
        
    }



    render(){
        const { isLoading } = this.state;
        if(isLoading === false){
            return(
                <div>
                    <Skeleton count={10}/>
                </div>
            )
        }
        else{
            return(
                <div className="animated fadeIn">
                   <Row>
                        <Col xs="12" md="12">
                            <Card>
                            <CardHeader>
                                <strong>Tạo mới </strong>
                            </CardHeader>
                            <CardBody>
                                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                                <FormGroup row>
                                    <Col md="3">
                                    <Label htmlFor="text-input">Tên kế hoạch</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="text" id="name-input" name="text-input" placeholder="Tên kế hoạch" 
                                            onChange={ (e) => this.setState({name: e.target.value})}/>
                                        <br></br>
                                        { (!this.state.isName) ?
                                            <Alert color="danger">
                                                {this.state.errorName}
                                            </Alert> : null }
                                    </Col>
                                    
                                </FormGroup>
        
                                <FormGroup row>
                                    <Col md="3">
                                    <Label htmlFor="text-input">Diễn giải</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                    <Input type="textarea" id="description-input" name="text-input" placeholder="Diễn giải" 
                                        onChange={ (e) => this.setState({description: e.target.value})}/>
                                        <br></br>
                                        { (!this.state.isDescription) ?
                                            <Alert color="danger">
                                                {this.state.errorDescription}
                                            </Alert> : null }
                                    </Col>
                                </FormGroup>
    
                                <FormGroup row>
                                    <Col md="3">
                                    <Label htmlFor="date-input">Ngày hoàn thành</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                    <Input type="date" id="date-input" name="date-input" placeholder="date" 
                                        onChange={ (e) => this.setState({enddate: e.target.value})}/>
                                        <br></br>
                                        { (!this.state.isEndDate) ?
                                            <Alert color="danger">
                                                {this.state.errorDate}
                                            </Alert> : null }
    
                                        <br></br>
                                        { (this.state.isCreate) ?
                                            <Alert color="success">
                                                Tạo mới kế hoạch cho năm thành công !
                                            </Alert> : null }
                                    </Col>
                                </FormGroup>
    
                                </Form>
                            </CardBody>
                            <CardFooter>
                                <Button onClick ={this.create} type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                            </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                </div>
            )
        }
    }
}


function mapStateToProps(state){
    return{
        userid: state.auth.userid
    }
  }
  
export default compose(
    connect(mapStateToProps, actions),
    reduxForm({ form:'planningyear'})
) (PlanningYear)