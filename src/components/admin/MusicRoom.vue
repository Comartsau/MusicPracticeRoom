<script>
import axios from 'axios';

export default {
  name: 'musicRoom',
  data() {
  return {
    rooms: [],
    newRoom: {
        room_name: '', 
      },
    editingRoomId: null, 
    editingRoom: {  
      room_name: '',
    },
  };
},

  created() {
      this.fetchRooms();
  },
  
  methods: {
    async fetchRooms() {
      try {
        const token = localStorage.getItem('Token');
        const response = await axios.get('http://26.125.18.207:8000/Room', {
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        console.log(response.data)
        this.rooms = response.data;
        // storedProducts = response.data;
      } catch (error) {
        console.log('เกิดข้อผิดพลาดในการดึงข้อมูลสินค้า:', error);
      }
    },

    async addRoom() {
      try {
        const token = localStorage.getItem('Token');
        const data = this.newRoom
        console.log(data)
        const response = await axios.post('http://26.125.18.207:8000/Room', data,  {
          headers: {
            'Authorization': `Token ${token}`,
            // 'Content-Type': 'multipart/form-data'
          }
        });
        console.log(response.data);
        this.rooms.push(response.data);
        this.newRoom = {
          room_name: '',
        };
        await this.fetchRooms();
      } catch (error) {
        console.log('เกิดข้อผิดพลาดในการเพิ่มสินค้า:', error);
      }
    },

    openEditRoomModal(room) {
      console.log(room.room_name)
  if (room) {
    this.editingRoomId = room.room_id;
    this.editingRoom = {
      room_name: room.room_name,
    };
  }
},

async editRoom(roomId) {
  console.log(roomId)
  try {
    const token = localStorage.getItem('Token');
    const data = this.editingRoom
    console.log(data)

    const response = await axios.put(`http://26.125.18.207:8000/Room/${roomId}`, data, {
      headers: {
        'Authorization': `Token ${token}`,
        // 'Content-Type': 'multipart/form-data'
      }
    });

    console.log(response.data);

    // ทำการอัปเดตข้อมูลสินค้าในตาราง
    const index = this.rooms.findIndex(room => room.room_id == roomId);
    if (index !== -1) {
      this.rooms[index] = response.data;
    }
    this.editingRoom = {
      room_name: '',
    };
    this.editingRoomId = null;
    await this.fetchRooms();
  } catch (error) {
    console.log('เกิดข้อผิดพลาดในการแก้ไขสินค้า:', error);
  }
},


async deleteRoom(roomId) {
  console.log(roomId)
  try {
    const token = localStorage.getItem('Token');
    const response = await axios.delete(`http://26.125.18.207:8000/Room/${roomId}/Delete`, {
      headers: {
        'Authorization': `Token ${token}`
      }
    });
    console.log(response.data);
    // หลังจากลบสินค้าแล้วให้ทำการดึงข้อมูลสินค้าใหม่
    await this.fetchRooms();
  } catch (error) {
    console.log('เกิดข้อผิดพลาดในการลบสินค้า:', error);
  }
}
},
  
  }

</script>

<template>
  <div class=" d-flex justify-content-between mt-3 " >
    <div class="d-flex col-11 justify-content-center "  >
      <h3 class="d-flex mb-0 ">หน้าห้องซ้อม</h3>
    </div>
    <div class="d-flex col-1">
      <button class="btn text-white" style="background-color:#3F2305; width: 120px;"  data-bs-toggle="modal" data-bs-target="#CreateModal">เพิ่มข้อมูล</button>
    </div>
  </div>

  <!-- Modal เพิ่มชื่อห้องซ้อมดนตรี -->
  <div class="modal fade" id="CreateModal"   tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class=" d-flex mt-3    ">
        <div class="col-10 ps-5 ">
          <h5 class=" text-center  ">เพิ่มข้อมูลห้องซ้อม</h5>
        </div>
        <div class="col-2  justify-content-center text-center  " >
          <button type="button" class="btn btn-close w-1" data-bs-dismiss="modal" aria-label="Close">
            </button>
        </div> 
          </div>
          <div class="modal-body">
         <form @submit.prevent="addRoom">
           <div class="form-group">
             <label for="productName">ชื่อห้อง</label>
             <input type="text" class="form-control" id="productName" v-model="newRoom.room_name"  required>
           </div>
           <div class="d-flex justify-content-center mt-5 ">
             <button type="submit" class="btn  text-white " style="background-color:#3F2305; width: 120px;"  >เพิ่มชื่อห้อง</button>
           </div>
         </form>
       </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

<!-- Modal แก้ไขชื่อห้องซ้อมดนตรี -->
<div class="modal fade" id="EditModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class=" d-flex mt-3    ">
        <div class="col-10 ps-5 ">
          <h5 class=" text-center  ">แก้ไขสินค้า</h5>
        </div>
        <div class="col-2  justify-content-center text-center  " >
          <button type="button" class="btn btn-close w-1" data-bs-dismiss="modal" aria-label="Close">
            </button>
        </div>
          
          </div>
  
      <div class="modal-body">
        <template v-if="editingRoom">
          <form @submit.prevent="editRoom(editingRoomId)">
    <div class="form-group">
      <label for="editProductCat">ชื่อห้อง</label>
      <input type="text" class="form-control" id="editRoomName" v-model="editingRoom.room_name" required>
    </div>
    <div class="d-flex justify-content-center mt-5 ">
      <button type="submit" class="btn  text-white " style="background-color:#3F2305; width: 120px;"  data-bs-dismiss="modal">บันทึก</button>
    </div>
  </form>
    </template>
    <template v-else>
      <p>ไม่มีข้อมูลสินค้าที่ต้องการแก้ไข</p>
    </template>
  
</div>

    </div>
  </div>
</div>

  <!-- ตารางห้องซ้อมดนตรี -->
  <div class="mt-3">
    <table class="table table-striped table-bordered table-sm  table-light shadow-sm"  >
      <thead >
        <tr >
          <th scope="col" class="text-center align-middle col-1" style="background-color:#3F2305 ; color: white;">ลำดับ</th>
          <th scope="col" class="text-center align-middle  col-2" style="background-color:#3F2305 ; color: white;">ชื่อห้อง</th>
          <th scope="col" class="text-center align-middle  col-2" style="background-color:#3F2305 ; color: white;">สถานะ</th>
          <th scope="col" class="text-center align-middle  col-1" style="background-color:#3F2305 ; color: white;">แก้ไข</th>
          <th scope="col" class="text-center align-middle  col-1" style="background-color:#3F2305 ; color: white;">ลบ</th>
        </tr>
      </thead>
      <tbody>
  <tr v-for="room in rooms" :key="room.room_id">
    <td class="text-center align-middle">{{ room.room_id }}</td>
    <td class="text-center align-middle">{{ room.room_name || '-' }}</td>
    <td class="text-center align-middle">
      <template v-if ="room.room_status == 1">
        ว่าง
      </template>
      <template v-else>
          ไม่ว่าง
        </template>
    </td>
    <td class="text-center align-middle fs-3"><i class="bi bi-pencil-square" type="button" style="color: #CAC403;"  data-bs-toggle="modal" data-bs-target="#EditModal" @click="openEditRoomModal(room)" ></i></td>
    <td class="text-center align-middle fs-3"><i class="bi bi-trash3-fill" type="button" style="color: red;" @click="deleteRoom(room.room_id)"></i></td>
  </tr>
</tbody>
    </table>
  </div>
</template>

<style>
</style>
