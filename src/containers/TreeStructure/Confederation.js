import React, { Component } from 'react'
import Tree from 'react-d3-tree';
import { LogoutTheUser } from "../../actions/auth";
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import axios from 'axios';
import { API_URL } from '../../utils/api';
import { Link } from 'react-router-dom';
import setAuthToken from '../../utils/setAuthToken';

export const Confederation = async (confederation_id, callback) => {
    try {
        // all the logics
        let confederation_male = 0;
        let confederation_female = 0;
        let federations = [];
        setAuthToken();
        const res_confederation = await axios.get(`${API_URL}/fedconf/conf/${confederation_id}`);
        for(let s in res_confederation.data.data) {
            var federation_id = res_confederation.data.data[s].federation_id;
            let fed_male = 0;
            let fed_female = 0;
            let unions = [];

            // --------------------------------
            try {
                // all the logics
                setAuthToken();
                const rest = await axios.get(`${API_URL}/unionfed/fed/${federation_id}`);
                for(let t in rest.data.data) {
                    var union_id = rest.data.data[t].union_id;
                    let union_male = 0;
                    let union_female = 0;
                    let cooperatives = [];
                    // _______________________________________
                    try {
                        // all the logics
                        setAuthToken();
                        const res_union = await axios.get(`${API_URL}/coopunion/union/${union_id}`);
                        for(let uni in res_union.data.data) {
                            let male = 0;
                            let female = 0;
                            var number_rows = 0;
                            let coop_id = res_union.data.data[uni].coop_id;
                            let member = [];
                            // Members of cooperative
                            try {
                                // all the logics
                                setAuthToken();
                                const res = await axios.get(`${API_URL}/members/coop/${coop_id}`);
                                for(let i in res.data.data) {
                                    if (res.data.data[i].gender === "Male") {
                                        male += 1;
                                    } else {
                                        female += 1;
                                    }
                                    member.push({
                                        attributes: {
                                            Gender: res.data.data[i].gender
                                        },
                                        name: res.data.data[i].fname,
                                        children: [
                                            {
                                                attributes: {
                                                    "": res.data.data[i].memberemail
                                                },
                                                name: "Contact"
                                            }
                                        ]
                                    })
                                }
                            } catch (error) {
                              console.log("err", error);
                            }
                            union_male += male;
                            union_female += female
                            cooperatives.push({
                                attributes: {
                                    Male: male,
                                    Female: female
                                },
                                name: res_union.data.data[uni].cooperative_name + ` ( ${member.length} Members)`,
                                children: member
                            })
                        }
                        // return member;
                    } catch (error) {
                        console.log("Err");
                    }
                    // _____________________________________
        
                    fed_male += union_male;
                    fed_female += union_female;
        
                    unions.push({
                        attributes: {
                            Male: union_male,
                            Female: union_female
                        },
                        name: rest.data.data[t].union_name + ` ( ${cooperatives.length} cooperatives)`,
                        children: cooperatives
                    })
                }
            } catch (error) {
                console.log("error");
            }
            // --------------------------------

            confederation_male += fed_male;
            confederation_female += fed_female;

            federations.push({
                attributes: {
                    Male: fed_male,
                    Female: fed_female
                },
                name: res_confederation.data.data[s].federation_name + ` ( ${unions.length} unions)`,
                children: unions
            })
        }
        // return member;
        return callback(true, { male: confederation_male, female: confederation_female, data: federations });
    } catch (error) {
      return callback(false, error);
    }
};