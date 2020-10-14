import store from "../Reducers"
import _ from 'underscore'




class Component{


    chatUserBlock(props){
        return `
        <div class=" user-block col mb-2 col-12 text-right" >
            <span class="  badge badge-info mb-1 p-2 text-wrap">${props}</span>
          </div>
        `
    }
    chatBotBlock(props){
        return `
        <div class=" bot-block col mb-2 col-12 text-left">
            <div class="avatar rounded-circle" style="background-image: url(/src/assets/images/robot.jpg);background-position: center;background-size: cover;background-repeat: no-repeat;height: 2rem;width: 2rem;"></div>
            <span class="badge badge-secondary mb-1 p-2 text-left text-wrap" style="background-color:#82c2ff;">${props}</span>
          </div>
        `
    }

    listSuggestionTemplate(props){
        return `
        <a href="#" class=" list-group-item d-flex justify-content-between list-group-item-action list-suggestion-block" data-message='${props}'>
            <i class="fas fa-bolt"></i>
            ${props}
            <i class="fas fa-external-link-alt"></i>
          </a>
        `
    }
    

    updateUsername(){
        const {
            oldUsername,
            newUsername,
            reUsername
        } = store.getState().chatQuery.kwargs.update
        const {username} = store.getState().user
        if (_.every([oldUsername,newUsername,reUsername,oldUsername===username,newUsername===reUsername])) {
            
            store.dispatch({type:"UPDATE_USER",payload:{username:newUsername}})
            
            return this.chatBotBlock(`your new username is '${newUsername}'`)
            
        } else {
            return this.chatBotBlock(`the username you entered is !incorrect try again`)
        }
        

        

    }


    showAccountBalance(){
        return  `
        <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
        <div class="card shadow-lg">
            <div class="card-body">
                <h5 class="text-muted">Your Current Balance is</h5>
                <div class="metric-value d-inline-block">
                    <h1 class="mb-1">N500,000</h1>
                </div>
                <div class="metric-label d-inline-block float-right text-success font-weight-bold">
                    <span><i class="fa fa-fw fa-arrow-up"></i></span><span>5.86%</span>
                </div>
            </div>
            <div id="sparkline-revenue"><canvas width="232" height="100" style="display: inline-block; width: 232.578px; height: 100px; vertical-align: top;"></canvas></div>
        </div>
    </div>
        `
    }



    RecentOrder(){
        return `
        <div class="shadow-lg col-xl-9 col-lg-12 col-md-6 col-sm-12 col-12">
                                <div class="card">
                                    <h5 class="card-header">Recent Orders</h5>
                                    <div class="card-body p-0">
                                        <div class="table-responsive">
                                            <table class="table">
                                                <thead class="bg-light">
                                                    <tr class="border-0">
                                                        <th class="border-0">#</th>
                                                        <th class="border-0">Image</th>
                                                        <th class="border-0">Product Name</th>
                                                        <th class="border-0">Product Id</th>
                                                        <th class="border-0">Quantity</th>
                                                        <th class="border-0">Price</th>
                                                        <th class="border-0">Order Time</th>
                                                        <th class="border-0">Customer</th>
                                                        <th class="border-0">Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>
                                                            <div class="m-r-10"><img src="assets/images/product-pic.jpg" alt="user" class="rounded" width="45"></div>
                                                        </td>
                                                        <td>Product #1 </td>
                                                        <td>id000001 </td>
                                                        <td>20</td>
                                                        <td>$80.00</td>
                                                        <td>27-08-2018 01:22:12</td>
                                                        <td>Patricia J. King </td>
                                                        <td><span class="badge-dot badge-brand mr-1"></span>InTransit </td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>
                                                            <div class="m-r-10"><img src="assets/images/product-pic-2.jpg" alt="user" class="rounded" width="45"></div>
                                                        </td>
                                                        <td>Product #2 </td>
                                                        <td>id000002 </td>
                                                        <td>12</td>
                                                        <td>$180.00</td>
                                                        <td>25-08-2018 21:12:56</td>
                                                        <td>Rachel J. Wicker </td>
                                                        <td><span class="badge-dot badge-success mr-1"></span>Delivered </td>
                                                    </tr>
                                                    <tr>
                                                        <td>3</td>
                                                        <td>
                                                            <div class="m-r-10"><img src="assets/images/product-pic-3.jpg" alt="user" class="rounded" width="45"></div>
                                                        </td>
                                                        <td>Product #3 </td>
                                                        <td>id000003 </td>
                                                        <td>23</td>
                                                        <td>$820.00</td>
                                                        <td>24-08-2018 14:12:77</td>
                                                        <td>Michael K. Ledford </td>
                                                        <td><span class="badge-dot badge-success mr-1"></span>Delivered </td>
                                                    </tr>
                                                    <tr>
                                                        <td>4</td>
                                                        <td>
                                                            <div class="m-r-10"><img src="assets/images/product-pic-4.jpg" alt="user" class="rounded" width="45"></div>
                                                        </td>
                                                        <td>Product #4 </td>
                                                        <td>id000004 </td>
                                                        <td>34</td>
                                                        <td>$340.00</td>
                                                        <td>23-08-2018 09:12:35</td>
                                                        <td>Michael K. Ledford </td>
                                                        <td><span class="badge-dot badge-success mr-1"></span>Delivered </td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="9"><a href="#" class="btn btn-outline-light float-right">View Details</a></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
        `
    }

    Indicator(){
        return `
        <div class=" bot-block col mb-2 col-12 text-left">
        <div class="avatar rounded-circle" style="background-image: url(/src/assets/images/robot.jpg);background-position: center;background-size: cover;background-repeat: no-repeat;height: 2rem;width: 2rem;"></div>
        <div class="spinner-grow text-primary" role="status" style="height: 10px;width: 10px;"><span class="sr-only">Loading...</span></div><div class="spinner-grow text-primary" role="status" style="height: 10px;width: 10px;"><span class="sr-only">Loading...</span></div><div class="spinner-grow text-primary" role="status" style="height: 10px;width: 10px;"><span class="sr-only">Loading...</span></div>
        </div>
        `
    }

}



export default Component
