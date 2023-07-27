<script>
import axios from 'axios'
import Product from '../components/admin/Product.vue'
import MusicRoom from '../components/admin/MusicRoom.vue'
import Promotion from '../components/admin/Promotion.vue'
export default {
  name: 'adminHome',
  data () {
    const login = localStorage.getItem("login")
    let showUser =""

    if(login == 0 ) {
       showUser = "แอดมิน"
    } else if (login == 1) {
       showUser = "เจ้าของร้าน"
    }else if (login == 2) {
       showUser = "พนักงาน"
    }
    return {
        login,
        showUser,
        userImage: '/src/images/man.png',
        content: "product"
    }
  },
  methods:{
    async logout() {
        try {
            const token = localStorage.getItem('Token')
            console.log(token)
            const response = await axios.post('http://26.125.18.207:8000/Logout', null,  {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            console.log(response.data);
            localStorage.removeItem("Token");
            localStorage.removeItem("login");
            this.$router.push('/');
        } catch (error) {
            console.log('Logout ไม่สำเร็จ ' + error);
        }
    },
    showProduct() {
      this.content = 'product';
    },
    showMusicRoom() {
      this.content = 'musicRoom';
    },
    showPromotion() {
      this.content = 'promotion';
    }
    
  },
  components: {
    Product,
    MusicRoom,
    Promotion,
}
}

</script>

<template>
    <nav class="navbar" style="background-color: #DFD7BF;">
      <div class="container-fluid justify-content-between">
      <div >
            <!-- toggler -->
            <button class="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">
                <i class="bi bi-list fs-3" data-bs-toggle="offcanvas" data-bs-target="#offcanvas"></i>
            </button>
        </div>
        <div>
            
            <i class=" bi bi-door-open fs-3 me-2  text-danger " type="button" @click="logout"></i>
          </div>
    </div>
  </nav>
    <div class="offcanvas offcanvas-start custom-offcanvas " data-bs-scroll="true"  tabindex="-1" id="offcanvas" style="background-color: #F5F5F5 ">
    <div class="offcanvas-header justify-content-end p-3" >
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class=" d-flex p-0 px-3">
        <img src="/src/images/man.png" alt="user" class=" border border-3 p-1 shadow-sm rounded rounded-3" style="width: 70px;"/>
        <h6 class="offcanvas-title d-none d-sm-block fs-4 ms-3 mt-3" id="offcanvas">{{ showUser }}</h6>
    </div>
    <hr/>
    <div class="offcanvas-body px-0 " >
        <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-start" id="menu">
            <li class="nav-item btn btn-outline-secondary border border-0 w-100 text-start " >
                <router-link to=""  class="nav-link text-truncate"  @click="showProduct">
                    <i class="fs-3 bi bi-basket" style="color:#3F2305;" ></i><span class="ms-3 d-none d-sm-inline " style="font-size: large; color: #3F2305;">สินค้า</span>
                </router-link>
            </li>
            <li class="nav-item btn btn-outline-secondary border border-0  w-100 text-start">
                <router-link to=""  class="nav-link text-truncate"  @click="showMusicRoom">
                    <i class="fs-3 bi-speaker" style="color:#3F2305;"></i><span class="ms-3 d-none d-sm-inline " style="font-size: large; color: #3F2305">ห้องซ้อม</span> 
                </router-link>
            </li>
            <li class="nav-item btn btn-outline-secondary border border-0 w-100 text-start ">
                <a href="#" class="nav-link text-truncate" @click="showPromotion">
                    <i class="fs-3 bi-gift " style="color:#3F2305;"></i><span class="ms-3 d-none d-sm-inline " style="font-size: large; color: #3F2305">โปรโมชั่น</span></a>
            </li>
            <li class="nav-item btn btn-outline-secondary border border-0  w-100 text-start" >
                <a href="#" class="nav-link   text-truncate" >
                    <i class="fs-3 bi-person-vcard " style="color:#3F2305;"></i><span class="ms-3 d-none d-sm-inline " style="font-size: large; color: #3F2305">ลูกค้า</span>
                </a>
            </li>
            <li class="nav-item btn btn-outline-secondary border border-0 w-100 text-start ">
                <a href="#" class="nav-link text-truncate">
                    <i class="fs-3 bi-calendar3" style="color:#3F2305;"></i><span class="ms-3 d-none d-sm-inline  " style="font-size: large; color: #3F2305">การจองห้อง</span></a>
            </li>
        </ul>
        <hr/>
        <div class=" d-flex justify-content-center align-items-center text-center me-3 " style="color:#DFD7BF;">
            
          <p class=" mb-0 mt-2 text-danger fw-bold" type="button" @click="logout">ออกจากระบบ</p> <i class=" bi bi-door-open fs-3 ms-2 text-danger " type="button" @click="logout"></i>
        </div>
    </div>
</div>
<div class="container">
    <div class="row rounded rounded-4" style="background-color: #F5F5F5; ">
        <div class="col ">
            <div v-if="content === 'product'">
          <Product />
        </div>
        <div v-else-if="content === 'musicRoom'">
          <MusicRoom />
        </div>  
        <div v-else-if="content === 'promotion'">
          <Promotion />
        </div>  
            </div>
        </div>
    </div>

</template>



<style>


</style>