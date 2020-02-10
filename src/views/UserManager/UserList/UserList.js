import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table,Badge } from 'reactstrap';
import { URL_API } from '../../../constant'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';

import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actions from '../../../actions';

class UserList extends Component {
    constructor(props){
        super(props);

        this.state = {
            listUser: [],
            isLoading: false,
            isAdmin: false
        }
    }

    async componentDidMount(){
        //check admin
        console.log(this.props.userid);
        await axios.post(URL_API + 'users/checkadmin',{
            userid: this.props.userid
        })
        .then((res) =>{
            if(res.data.result === "ok"){
                this.setState({
                    isAdmin: true
                })
            }
            else{
                this.setState({
                    isAdmin: false
                })
            }
        })
        .catch(error =>{
            this.setState({
                isAdmin: false
            })
        })

        const token = localStorage.getItem('token');
        await axios.get(URL_API + 'users/',{
            headers: {
                Authorization: token
              }
        })
        .then((req) =>{
            this.setState({
                listUser: req.data.data,
                isLoading: true
            })
        })
        .catch(error =>{
            this.setState({
                listUser: [],
                isLoading: true
            })
        })
    }

    render() {
        const { isLoading,isAdmin } = this.state;
        if(isAdmin === false){
            return(
                <div>
                    Bạn không có quyền vào màn hình này !
                </div>
            )
        }
        else{
            if(isLoading === false){
                return(
                    <div>
                        <Skeleton count={10}/>
                    </div>
                )
            }
            else{
                return (
                    <div className="animated fadeIn">
                      <Row>
                        <Col >
                          <Card>
                            <CardHeader>
                              <strong><i className="icon-info pr-1"></i>Danh sách nhân viên phòng ban</strong>
                            </CardHeader>
                            <CardBody>
                                <Table responsive striped hover size="sm">
                                <thead>
                              <tr>
                                <th>Tên</th>
                                <th>Email</th>
                                <th>Phòng ban</th>
                                <th>Kế hoạch năm</th>
                                <th>Kế hoạch hằng ngày</th>
                                <th>Role</th>
                                <th>Trạng thái</th>
                              </tr>
                              </thead>
                              <tbody>
                              {
                                        this.state.listUser.map(data =>(
                                            <tr key={data._id}>
                                                <td>{data.username}</td>
                                                <td>{data.email}</td>
                                                <td>{data.department}</td>
                                                <td><Link to={"/planning-year-user/:id"+ data._id }>Xem chi tiết</Link></td>
                                                <td><Link to={"/planning-daily-user/:id"+ data._id }>Xem chi tiết</Link></td>
                                                {
                                                    data.isAdmin ? 
                                                    
                                                    <td>Admin</td> : null
                                                }
                                                {
                                                    !data.isAdmin ?  
                                                    <td>Member</td> : null
                                                }
                                                {
                                                    data.isActive ? 
                                                    
                                                    <td><Badge color='success'>Active</Badge></td> : null
                                                }
                                                {
                                                    !data.isActive ?  
                                                    <td><Badge color='danger'>Banned</Badge></td> : null
                                                }
                                            </tr>
                                        ))
                                    }
                              
                              </tbody>
                                </Table>
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                    </div>
                  )
            }
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
    reduxForm({ form:'userlist'})
)(UserList)