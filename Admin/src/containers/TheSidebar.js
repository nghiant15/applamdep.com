import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'reactstrap';
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react'
import logoMainnet from './../assets/img/logo_head.png';
import CIcon from '@coreui/icons-react'
import API_CONNECT from '../functions/callAPI'
import Constants from '../contants/contants'

// sidebar nav config
import navigations from './_nav'

const callApiGetRoleSubAdmin = async (user) => {
  
  if (user == null || JSON.parse(user) == null) {
    return;
  }
  const res = await API_CONNECT(Constants.GET_ROLE_SUBADMIN, {
    user_id: JSON.parse(user).sale_id
  }, "", "POST")
  return res.data.sidebar_id
}

const TheSidebar = () => {
  const [sidebar, setSidebar] = useState([]);
  const type = localStorage.getItem('type');
  const user = localStorage.getItem('user');

  useEffect(async () => {
    var data = await callApiGetRoleSubAdmin(user)
    setSidebar(data);
  }, []);

  var temp = []
  var navigation = [];

  for (let i = 0; i < navigations.length; i++) {
    for (let y = 0; y < sidebar.length; y++) {
      for (let z = 0; z < navigations[sidebar[y]].length; z++) {
        navigations[sidebar[y]][z].role.push("5")
      }
    }
    navigation = navigation.concat(navigations[i])
  }

  //Phân quyền bên phía menu
  for (let i = 0; i < navigation.length; i++) {
    if (navigation[i].role.includes(type)) {
      navigation[i].hidden = false;
      if (navigation[i]._children != undefined) {
        var _child = navigation[i]._children;
        for (let y = 0; y < _child.length; y++) {
          var roleCheck = _child[y].role;
          if (roleCheck != undefined) {
            if (roleCheck.includes(type)) {
              _child[y].hidden = false
            } else {
              _child[y].hidden = true
            }
          }
        }
      }
    } else {
      navigation[i].hidden = true;
    }
  }

  for (let i = 0; i < navigation.length; i++) {
    if (navigation[i]._children) {
      for (let y = 0; y < navigation[i]._children.length; y++) {
        if (navigation[i]._children[y].to) {
          temp.push({ "url": "#" + navigation[i]._children[y].to, "isHidden": navigation[i].hidden })
        }
      }
    }
  }

  localStorage.setItem('url', JSON.stringify(temp))

  const dispatch = useDispatch()
  const show = useSelector(state => state.sidebarShow)

  return (
    <CSidebar
      show={show}
      size={"lg"}
      onShowChange={(val) => dispatch({ type: 'set', sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <NavLink style={{ fontSize: 20 }} href="/" className="nav-link" activeStyle={{ textDecoration: 'underline' }}>
          <img src={logoMainnet} width="110" height="auto" alt="HB Analytics Logo" className="navbar-brand-full" /></NavLink>
        <CIcon
          className="c-sidebar-brand-minimized"
          name="sygnet"
          height={35}
        />
      </CSidebarBrand>
      <CSidebarNav>
        
        <div style={{ backgroundColor: '#fffff' }}>
          <CCreateElement
            items={navigations[0]}
            components={{
              CSidebarNavDivider,
              CSidebarNavDropdown,
              CSidebarNavItem,
              CSidebarNavTitle
            }}
          />
        </div>
        <div style={{ backgroundColor: '#fffff' }}>
          <CCreateElement
            items={navigations[1]}
            components={{
              CSidebarNavDivider,
              CSidebarNavDropdown,
              CSidebarNavItem,
              CSidebarNavTitle
            }}
          />
        </div>
        <div style={{ backgroundColor: '#fffff' }}>
          <CCreateElement
            items={navigations[2]}
            components={{
              CSidebarNavDivider,
              CSidebarNavDropdown,
              CSidebarNavItem,
              CSidebarNavTitle
            }}
          />
        </div>
        <div style={{ backgroundColor: '#fffff' }}>
          <CCreateElement
            items={navigations[3]}
            components={{
              CSidebarNavDivider,
              CSidebarNavDropdown,
              CSidebarNavItem,
              CSidebarNavTitle
            }}
          />
        </div>
        <div style={{ backgroundColor: '#fffff' }}>
          <CCreateElement
            items={navigations[4]}
            components={{
              CSidebarNavDivider,
              CSidebarNavDropdown,
              CSidebarNavItem,
              CSidebarNavTitle
            }}
          />
        </div>

        <div style={{ backgroundColor: '#fffff' }}>
          <CCreateElement
            items={navigations[5]}
            components={{
              CSidebarNavDivider,
              CSidebarNavDropdown,
              CSidebarNavItem,
              CSidebarNavTitle
            }}
          />


        
        </div>

        <div style={{ backgroundColor: '#fffff' }}>
          <CCreateElement
            items={navigations[6]}
            components={{
              CSidebarNavDivider,
              CSidebarNavDropdown,
              CSidebarNavItem,
              CSidebarNavTitle
            }}
          />


        
        </div>



        <div style={{ backgroundColor: '#fffff' }}>
          <CCreateElement
            items={navigations[7]}
            components={{
              CSidebarNavDivider,
              CSidebarNavDropdown,
              CSidebarNavItem,
              CSidebarNavTitle
            }}
          />


        
        </div>


        <div style={{ backgroundColor: '#fffff' }}>
          <CCreateElement
            items={navigations[8]}
            components={{
              CSidebarNavDivider,
              CSidebarNavDropdown,
              CSidebarNavItem,
              CSidebarNavTitle
            }}
          />


        
        </div>

        <div style={{ backgroundColor: '#fffff' }}>
          <CCreateElement
            items={navigations[9]}
            components={{
              CSidebarNavDivider,
              CSidebarNavDropdown,
              CSidebarNavItem,
              CSidebarNavTitle
            }}
          />


        
        </div>
        <div style={{ backgroundColor: '#fffff' }}>
          <CCreateElement
            items={navigations[10]}
            components={{
              CSidebarNavDivider,
              CSidebarNavDropdown,
              CSidebarNavItem,
              CSidebarNavTitle
            }}
          />


        
        </div>
      </CSidebarNav>
      {/* <CSidebarMinimizer className="c-d-md-down-none" /> */}
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
