import React, { Component } from 'react';
import { Badge,Button, Card, CardBody, CardHeader, Col, Pagination, PaginationItem,Alert, PaginationLink, Row, 
    Table,Modal, ModalBody, ModalFooter, ModalHeader,Input,FormGroup,
    Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import axios from 'axios';
import { URL_API } from '../../../constant'
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actions from '../../../actions';

class PlanningYear_List extends Component{
    constructor(props){
        super(props);
        this.state = {
            listData: [],
            isLoading: false,
            danger: false,
            isDelete: false,
            dropdownAcction: false,
            dropDownValue: 'Trạng thái',
        }

        this.toggleDanger = this.toggleDanger.bind(this);
        this.delete = this.delete.bind(this);
        this.toggle = this.toggle.bind(this);
        this.changeValue = this.changeValue.bind(this);
    }

    //
    toggleDanger() {
        this.setState({
          danger: !this.state.danger,
        });
    }

    toggle(event) {
        this.setState({
            dropdownAcction: !this.state.dropdownAcction
        });
    }

    async componentDidMount(){
        console.log(this.props.userid)
        await axios.post(URL_API + 'plantyears/Getbyuser',{
            userid: this.props.userid
        })
        .then((req) =>{
            this.setState({
                listData: req.data.data,
                isLoading: true
            })
        })
        .catch(error =>{
            console.log('Error: ' + error)
        })
    }

    async delete(id){
        this.setState({
            isLoading: false
        })
        const token = localStorage.getItem('token');

        await axios.delete(URL_API + `plantyears/${id}`,{
            headers: {
                Authorization: token
              }
        })
        .then((res) =>{
            if(res.status === 200){
                this.setState({
                    isDelete: true,
                    danger: !this.state.danger
                })

                axios.get(URL_API + 'plantyears/',{
                    headers: {
                        Authorization: token
                      }
                })
                .then((req) =>{
                    this.setState({
                        listData: req.data.data,
                        isLoading: true
                    })
                })
                .catch(error =>{
                    console.log('Error: ' + error)
        })
            }
        })
        .catch(error =>{
            console.log(error)
            this.setState({
                isDelete: true,
                danger: !this.state.danger
            })
        })
    }

    async search(e){
        //const token = localStorage.getItem('token');
        await axios.post(URL_API + `plantyears/searchText`,{
            keyword: e.target.value,
            userid: this.props.userid
        })
        .then((req) =>{
            if(req.data.data.length > 0){
                this.setState({
                    listData: req.data.data,
                    isLoading: true
                })
            }
        })
        .catch(error =>{
            console.log('Error: ' + error)
        })
    }

    async changeValue(e){
        this.setState({
            dropDownValue: e.currentTarget.textContent,
            isLoading: false
        })
        //
        let acction = "";
        if(e.currentTarget.id === "done"){
            acction = "true";
        }
        else if(e.currentTarget.id === "notdone"){
            acction = "false";
        }
        else{
            acction = "all";
        }
        
        if(acction === "all"){
            await axios.post(URL_API + 'plantyears/Getbyuser',{
                userid: this.props.userid
            })
            .then((req) =>{
                this.setState({
                    listData: req.data.data,
                    isLoading: true
                })
            })
            .catch(error =>{
                console.log('Error: ' + error)
            })
        }
        else{
            //const token = localStorage.getItem('token');
            await axios.post(URL_API + `plantyears/filter/${acction}`,{
                userid: this.props.userid
            })
            .then((req) =>{
                this.setState({
                    listData: req.data.data,
                    isLoading: true
                })
            })
            .catch(error =>{
                console.log('Error: ' + error)
            })
        }
    }

    render() {
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
                        <Col>
                            <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> Danh sách
                                    <CardBody>
                                        <FormGroup row className="my-0">
                                            <Col xs="8">
                                                <Dropdown isOpen={this.state.dropdownAcction} toggle={this.toggle}>
                                                <DropdownToggle caret>
                                                    {this.state.dropDownValue}
                                                </DropdownToggle>
                                                <DropdownMenu right style={{right: 'auto'}}>
                                                    <DropdownItem id="done" onClick={this.changeValue}> <div id="done" onClick={this.changeValue}>Hoàn thành</div></DropdownItem>
                                                    <DropdownItem id="notdone" onClick={this.changeValue}><div id="notdone" onClick={this.changeValue}>Chưa hoàn thành</div></DropdownItem>
                                                    <DropdownItem id="all" onClick={this.changeValue}><div id="all" onClick={this.changeValue}>Tất cả</div></DropdownItem>
                                                </DropdownMenu>
                                                </Dropdown>
                                            </Col>   
                                            <Col xs="4">
                                                <FormGroup>
                                                    <Input type="text" id="postal-code" placeholder="Search..." 
                                                        onChange = { (e) => this.search(e)}/>
                                                </FormGroup>
                                            </Col>
                                        </FormGroup>
                                    </CardBody>
                            </CardHeader>
                            
                            <CardBody>
                                <Table hover bordered striped responsive size="sm">
                                <thead>
                                <tr>
                                    <th>Tên kế hoạch</th>
                                    <th>Diễn giải</th>
                                    <th>Ngày hoàn thành</th>
                                    <th>Phần trăm hoàn thành</th>
                                    <th>Trạng thái</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
    
                                <tbody>
                                {
                                    this.state.listData.map(data =>(
                                        <tr key={data._id}>
                                            <td>{data.name}</td>
                                            <td>{data.description}</td>
                                            <td>{new Date(data.endDate).toLocaleString()}</td>
                                            <td>{data.completed}%</td>
                                            {
                                                data.done ? 
                                                <td><Badge color="success">Hoàn thành</Badge></td> : null
                                            }
                                            {
                                                !data.done ?  
                                                <td><Badge color="danger">Chưa hoàn thành</Badge></td> : null
                                            }
                                            <td>
                                                <Link to={"/planning-year-detail/:id"+ data._id }>
                                                    <Button block color="primary" className="btn-pill">Update</Button>
                                                </Link> 
                                                <Button onClick={this.toggleDanger} block color="danger" className="btn-pill">Delete</Button>
                                                    <Modal isOpen={this.state.danger} toggle={this.toggleDanger}
                                                        className={'modal-danger ' + this.props.className}>
                                                    <ModalHeader toggle={this.toggleDanger}>Thông Báo</ModalHeader>
                                                    <ModalBody>
                                                        Bạn có chắc muốn xóa kế hoạch này không
                                                    </ModalBody>
                                                    <ModalFooter>
                                                        <Button color="danger" onClick={ () => this.delete(data._id)}>Delete</Button>{' '}
                                                        <Button color="secondary" onClick={this.toggleDanger}>Cancel</Button>
                                                        { (this.state.isDelete) ?
                                                            <Alert color="danger">
                                                                Xóa thành công!
                                                            </Alert> : null }
                                                    </ModalFooter>
                                                    </Modal>  
                                            </td>
                                        </tr>
                                    ))
                                }
                                </tbody>
    
                                </Table>
                                <nav>
                                <Pagination>
                                    <PaginationItem><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                                    <PaginationItem active>
                                    <PaginationLink tag="button">1</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                                    <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                                    <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                                    <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                                </Pagination>
                                </nav>
                            </CardBody>
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
    reduxForm({ form:'planningyear_list'})
) (PlanningYear_List)