import React from 'react';
import { Link } from 'react-router-dom';

import {
    CAvatar,
    CButton,
    CButtonGroup,
    CTableBody,
    CTableDataCell,
    CTableRow,
  } from '@coreui/react'

const UserList = ({ users, name }) => {

    return (
        <>
                <CTableBody>
                  {users.map((item) => (
                    <CTableRow v-for="item in tableItems" key={item.user_id}>
                      <CTableDataCell className="text-center">
                        <div>{item.user_id}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.name}</div>
                        <div className="small text-body-secondary text-nowrap"> Registered:{' '}
                          {item.created_at}
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>{item.email}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.updated_at}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>{item.role_id}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>{item.status}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>boton1</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>boton1</div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
        </>
    );
};

export default UserList;