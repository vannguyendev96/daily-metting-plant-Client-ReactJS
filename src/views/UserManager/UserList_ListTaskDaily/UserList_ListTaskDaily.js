import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, 
    Table,Input,FormGroup,
    Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import axios from 'axios';
import { URL_API } from '../../../constant'
import Skeleton from 'react-loading-skeleton';

class UserList_ListTaskDaily extends Component{
    constructor(props){
        super(props);
        this.state = {
            listData: [],
            isLoading: false,
            dropdownAcction: false,
            dropDownValue: 'Trạng thái',
        }

        this.toggle = this.toggle.bind(this);
        this.changeValue = this.changeValue.bind(this);
    }

    toggle(event) {
        this.setState({
            dropdownAcction: !this.state.dropdownAcction
        });
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
            await axios.post(URL_API + 'plant-daily-meeting/Getbyuser/1',{
                userid: (this.props.match.params.id).slice(3,(this.props.match.params.id).length)
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
            await axios.post(URL_API + `plant-daily-meeting/filter/${acction}`,{
                userid: (this.props.match.params.id).slice(3,(this.props.match.params.id).length)
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

    async search(e){
        //const token = localStorage.getItem('token');
        await axios.post(URL_API + `plant-daily-meeting/searchText`,{
            keyword: e.target.value,
            userid: (this.props.match.params.id).slice(3,(this.props.match.params.id).length)
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

    async componentDidMount(){
        await axios.post(URL_API + 'plant-daily-meeting/Getbyuser/1',{
            userid: (this.props.match.params.id).slice(3,(this.props.match.params.id).length)
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
                                    <th>Ghi chú</th>
                                    <th>Ngày bắt đầu</th>
                                    <th>Ngày hoàn thành</th>
                                    <th>Phần trăm hoàn thành</th>
                                    <th>Trạng thái</th>
                                </tr>
                                </thead>
    
                                <tbody>
                                {
                                    this.state.listData.map(data =>(
                                        <tr key={data._id}>
                                            <td>{data.name}</td>
                                            <td>{data.description}</td>
                                            <td>{data.note}</td>
                                            <td>{new Date(data.startDate).toLocaleString()}</td>
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

export default UserList_ListTaskDaily;