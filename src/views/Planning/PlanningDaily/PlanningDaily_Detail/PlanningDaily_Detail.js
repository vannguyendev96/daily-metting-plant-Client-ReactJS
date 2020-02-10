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
    Progress,
  } from 'reactstrap';

import axios from 'axios';
import { URL_API } from '../../../../constant';
import Skeleton from 'react-loading-skeleton';

class PlanningDaily_Detail extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            description: '',
            note: '',
            startdate: '',
            enddate: '',
            completed: '',
            errorName: '',
            errorDescription: '',
            errorNote: '',
            errorStartDate: '',
            errorDate: '',
            errorCompleted: '',
            isCreate: false,
            isName: true,
            isDescription: true,
            isStartDate: true,
            isEndDate: true,
            isNote: true,
            isCompleted: true,
            isLoading: false
        }

        this.update = this.update.bind(this);
        this.onChangeEndDate = this.onChangeEndDate.bind(this);
    }

    //
    async componentDidMount(){
        const token = localStorage.getItem('token');
        await axios.get(URL_API + `plant-daily-meeting/${(this.props.match.params.id).slice(3,(this.props.match.params.id).length)}`,{
            headers: {
                Authorization: token
              }
        })
        .then((res) =>{
            //end date
            const newData = (new Date(res.data.data.endDate));
            let month,day = '';
            if(parseInt((newData).getMonth()+1) < 10){
                month = "0"+ parseInt((newData).getMonth()+1);
            }
            else{
                month = parseInt((newData).getMonth()+1);
            }

            //
            if((newData).getDate() < 10){
                day = "0" + (newData).getDate();
            }
            else{
                day = (newData).getDate();
            }
            const dataPlanning = (newData).getFullYear()+"-" + month +"-"+ day;

            //start date
            const newStartDate = (new Date(res.data.data.startDate));
            let monthStart,dayStart = '';
            if(parseInt((newStartDate).getMonth()+1) < 10){
                monthStart = "0"+ parseInt((newStartDate).getMonth()+1);
            }
            else{
                monthStart = parseInt((newStartDate).getMonth()+1);
            }

            //
            if((newStartDate).getDate() < 10){
                dayStart = "0" + (newStartDate).getDate();
            }
            else{
                dayStart = (newStartDate).getDate();
            }
            const dataPlanningStartDate = (newStartDate).getFullYear()+"-" + monthStart +"-"+ dayStart;
            this.setState({
                name: res.data.data.name,
                description: res.data.data.description,
                note: res.data.data.note,
                startdate: dataPlanningStartDate,
                enddate: dataPlanning,
                completed: res.data.data.completed,
                isLoading: true
            })
        })
        .catch(error =>{
            console.log(error);
        })
    }

    async update(){
        const { name,description,note,startdate,enddate,completed,isName,isDescription,isEndDate,isCompleted } = this.state;
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

        if(completed === ""){
            this.setState({
                errorCompleted: 'Phần trăm hoàn thành không được trống',
                isCompleted: false,
                isCreate: false
            })
        }
        else{
            if(parseFloat(completed) < 0 || parseFloat(completed) > 100){
                this.setState({
                    errorCompleted: 'Phần trăm hoàn thành phải lớn hơn 0 và bé hơn 100%',
                    isCompleted: false,
                    isCreate: false
                })
            }
            else{
                this.setState({
                    isCompleted: true
                })
            }
        }

        if(isDescription && isEndDate && isName && isCompleted){
            let done = false;
            if(parseFloat(completed) === 100){
                done = true;
            }
            await axios.put(URL_API + `plant-daily-meeting/${(this.props.match.params.id).slice(3,(this.props.match.params.id).length)}`
            ,{
                name,
                description,
                note,
                startDate: startdate,
                endDate: enddate,
                completed,
                done
            }).then((req) =>{
                if(req.status === 200){
                    this.setState({
                        isCreate: true
                    })
                }
            }).catch(error =>{
                this.setState({
                    isCreate: false
                })
            })
        }
        
    }

    onChangeEndDate(e,check){
        const newData = (new Date(e.target.value));
            let month,day = '';
            if(parseInt((newData).getMonth()+1) < 10){
                month = "0"+ parseInt((newData).getMonth()+1);
            }
            else{
                month = parseInt((newData).getMonth()+1);
            }

            //
            if((newData).getDate() < 10){
                day = "0" + (newData).getDate();
            }
            else{
                day = (newData).getDate();
            }
            const dataPlanning = (newData).getFullYear()+"-" + month +"-"+ day;
            if(check === 1){
                this.setState({
                    enddate: dataPlanning
                })
            }
            else{
                this.setState({
                    startdate: dataPlanning
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
                                <strong>Chỉnh sữa </strong>
                            </CardHeader>
                            <CardBody>
                                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                                <FormGroup row>
                                    <Col md="3">
                                    <Label htmlFor="text-input">Tên kế hoạch</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="text" id="name-input" name="text-input" placeholder="Tên kế hoạch" 
                                            onChange={ (e) => this.setState({name: e.target.value})}
                                            value = {this.state.name}
                                            />
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
                                        onChange={ (e) => this.setState({description: e.target.value})}
                                        value = {this.state.description}
                                        />
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
                                        onChange={ (e) => this.onChangeEndDate(e,2)}
                                        value = {this.state.startdate}/>
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
                                        onChange={ (e) => this.onChangeEndDate(e,1)}
                                         value = {this.state.enddate}
                                        />
                                        <br></br>
                                        { (!this.state.isEndDate) ?
                                            <Alert color="danger">
                                                {this.state.errorDate}
                                            </Alert> : null }
    
                                        <br></br>
                                    </Col>
                                </FormGroup>
    
                                <FormGroup row>
                                    <Col md="3">
                                    <Label htmlFor="date-input">Phần trăm hoàn thành</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                    <Input type="text" id="complete-input" name="complete-input" placeholder="complete" 
                                        onChange={ (e) => this.setState({ completed : e.target.value})}
                                         value = {this.state.completed}  
                                        />
                                        <br></br>
                                        { (!this.state.isCompleted) ?
                                            <Alert color="danger">
                                                {this.state.errorCompleted}
                                            </Alert> : null }
    
                                        

                                    <Progress animated color="success" value= {this.state.completed}  className="mb-3" />
                                    <br></br>
                                    { (this.state.isCreate) ?
                                            <Alert color="success">
                                                Chỉnh sữa kế hoạch cho năm thành công !
                                            </Alert> : null }
                                    </Col>
                                </FormGroup>
    
                                </Form>
                            </CardBody>
                            <CardFooter>
                                <Button onClick ={this.update} type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                            </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                </div>
            )
        }
    }
}

export default PlanningDaily_Detail;