import React from 'react';
// import Dropdown from 'react-multilevel-dropdown';
import { NavLink } from 'react-router-dom';
import { CgMenu } from "react-icons/cg"

function OffCanvas({ categories, sub_categories }) {

  return (
    <>

      <button className="" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
        <CgMenu size={25} />
      </button>

      <div className="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Home</li>
            <li className="list-group-item dropdown">
              <button class="dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                Categories
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" >
                {
                  categories && categories.map((item, index) => (
                    item.parent_id ? <></> :
                      <div className="col-md-3 menu-item" key={index}>
                        <h5 className="menu-title">
                          <NavLink className="navlink" to={'/productCategory/' + item.slug}>{item.name}</NavLink>
                        </h5>
                        <ul className="menu-list">
                          {
                            sub_categories && sub_categories.map((sub_item, index) => (
                              sub_item.parent_id.name === item.name ?

                                <li key={index}><NavLink className="navlink" to={'/productCategory/' + sub_item.slug}>{sub_item.name}</NavLink></li>

                                : <></>
                            ))
                          }
                        </ul>

                      </div>
                  ))

                }
                {/* <li><NavLink class="dropdown-item" href="#">Smartphones</NavLink></li>
                <li>
                  <Dropdown
                    title='Audio'
                    position='right'
                    buttonClassName='dropmenu'
                  >
                    <Dropdown.Item>
                      Headphones
                    </Dropdown.Item>
                    <Dropdown.Item>
                      Speakers
                    </Dropdown.Item>
                  </Dropdown>
                </li>
                <li><NavLink class="dropdown-item" href="#">Laptops</NavLink></li> */}
              </ul>

            </li>
            <li className="list-group-item">Deals</li>
            <li className="list-group-item">About</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default OffCanvas