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
import { URL_API } from '../../../../constant';
import Skeleton from 'react-loading-skeleton';

import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actions from '../../../../actions';

class PlanningDaily_Create extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            description: '',
            note: '',
            startdate: '',
            enddate: '',
            errorName: '',
            errorDescription: '',
            errorNote: '',
            errorStartDate: '',
            errorDate: '',
            isCreate: false,
            isName: true,
            isDescription: true,
            isStartDate: true,
            isEndDate: true,
            isNote: true,
            isLoading: true,
        }

        this.create = this.create.bind(this);
    }

    componentDidMount(){
        console.log('userID: ' + this.props.userid)
    }

    async create(){
        const { name,description,note,startdate,enddate,isName,isDescription,isEndDate,isStartDate } = this.state;
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

        //validate note
        if(note === ""){
            this.setState({
                errorNote: 'Ghi chú không được trống!',
                isCreate: false,
                isNote: false
            })
        }
        else{
            if(note.length > 200){
                this.setState({
                    errorNote: 'Ghi chú không dài quá 200 kí tự!',
                    isCreate: false,
                    isNote: false
                })
            }
            else{
                this.setState({
                    isNote: true
                })
            }
        }

        //validate data
        if(startdate === ""){
            this.setState({
                errorStartDate: 'Ngày bắt đầu không được trống',
                isCreate: false,
                isStartDate: false
            })
        }
        else{
            this.setState({
                isStartDate: true
            })
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

        if(isDescription && isEndDate && isName && isStartDate 
            && description !== "" && enddate !== "" && name !== "" && note !== ""  && startdate !== ""){

            //const token = localStorage.getItem('token');
            this.setState({
                isLoading: false
            })
            console.log(this.props.userid)
            await axios.post(URL_API + 'plant-daily-meeting',{
                name,
                description,
                endDate: enddate,
                startDate: startdate,
                userid: this.props.userid
            }).then((req) =>{
                if(req.status === 200){
                    console.log(this.props.userid)
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
                                    <Label htmlFor="text-input">Ghi chú</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                    <Input type="textarea" id="note-input" name="text-input" placeholder="Ghi chú" 
                                        onChange={ (e) => this.setState({note: e.target.value})}/>
                                        <br></br>
                                        { (!this.state.isNote) ?
                                            <Alert color="danger">
                                                {this.state.errorNote}
                                            </Alert> : null }
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Col md="3">
                                    <Label htmlFor="date-input">Ngày bắt đầu</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                    <Input type="date" id="datestart-input" name="date-input" placeholder="date" 
                                        onChange={ (e) => this.setState({startdate: e.target.value})}/>
                                        <br></br>
                                        { (!this.state.isStartDate) ?
                                            <Alert color="danger">
                                                {this.state.errorStartDate}
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
    reduxForm({ form:'planningdaily_create'})
) (PlanningDaily_Create)