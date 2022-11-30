import { Injectable, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SweetalertService {
  showError(errorMsg: string) {
    Swal.fire({
      title: 'Error!',
      text: errorMsg,
      icon: 'error',
      confirmButtonText: 'OK',
      confirmButtonColor: '#FE9D2A',
    });
  }
}
