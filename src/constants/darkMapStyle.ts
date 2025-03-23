export const darkMapStyle = [
    {
      elementType: 'geometry',
      stylers: [{ color: '#1B1B1B' }] // Màu nền bản đồ
    },
    {
      elementType: 'labels.text.fill',
      stylers: [{ color: '#A3A3A3' }] // Màu chữ
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [{ color: '#000000' }] // Viền chữ để dễ đọc
    },
    {
      featureType: 'administrative',
      elementType: 'geometry',
      stylers: [{ color: '#303030' }] // Đường biên khu vực hành chính
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [{ color: '#292929' }] // Màu khu vực địa điểm quan trọng
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#373737' }] // Màu đường chính
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{ color: '#4A4A4A' }] // Màu đường cao tốc
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#888888' }] // Viền sáng cho đường cao tốc
    },
    {
      featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [{ color: '#4F4F4F' }] // Màu đường phụ
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#0F2027' }] // Màu nước (xanh đậm)
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#4E94A5' }] // Màu chữ cho tên sông, hồ
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{ color: '#2F2F2F' }] // Màu tàu điện / ga tàu
    },
    {
      featureType: 'landscape.man_made',
      elementType: 'geometry',
      stylers: [{ color: '#333333' }] // Công trình nhân tạo
    },
    {
      featureType: 'landscape.natural',
      elementType: 'geometry',
      stylers: [{ color: '#1D1D1D' }] // Khu vực tự nhiên
    }
  ];
  