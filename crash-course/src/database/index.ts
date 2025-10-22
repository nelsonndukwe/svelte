
   export  const users:{
      id: number;
      name: string;
      email: string;
      password: string;
      role?: 'admin' | 'editor' | 'viewer';
      status?: 'active' | 'inactive';
      avatar?: string;
      lastLogin?: string;
      createdAt: string;
   }[] = [
      {
        "id": 1,
        "name": "Alice Johnson",
        "email": "alice.johnson@example.com",
        "password": "hashedpassword123",
        "role": "admin",
        "status": "active",
        "avatar": "https://randomuser.me/api/portraits/women/1.jpg",
        "lastLogin": "2025-10-18T10:45:00Z",
        "createdAt": "2023-09-01T08:30:00Z",
        
      },
      {
        "id": 2,
        "name": "Michael Smith",
        "email": "michael.smith@example.com",
        "password": "hashedpassword456",
        "role": "editor",
        "status": "active",
        "avatar": "https://randomuser.me/api/portraits/men/2.jpg",
        "lastLogin": "2025-10-19T09:00:00Z",
        "createdAt": "2024-01-15T11:15:00Z",
        
      },
      {
        "id": 3,
        "name": "Sophia Martinez",
        "email": "sophia.martinez@example.com",
        "password": "hashedpassword789",
        "role": "viewer",
        "status": "inactive",
        "avatar": "https://randomuser.me/api/portraits/women/3.jpg",
        "lastLogin": "2025-08-22T14:35:00Z",
        "createdAt": "2023-10-12T10:00:00Z",
        
      },
      {
        "id": 4,
        "name": "James Lee",
        "email": "james.lee@example.com",
        "password": "hashedpassword999",
        "role": "editor",
        "status": "active",
        "avatar": "https://randomuser.me/api/portraits/men/4.jpg",
        "lastLogin": "2025-10-19T19:10:00Z",
        "createdAt": "2024-05-20T12:10:00Z",
        
      },
      {
        "id": 5,
        "name": "Emma Wilson",
        "email": "emma.wilson@example.com",
        "password": "hashedpassword321",
        "role": "viewer",
        "status": "active",
        "avatar": "https://randomuser.me/api/portraits/women/5.jpg",
        "lastLogin": "2025-10-17T20:15:00Z",
        "createdAt": "2023-12-11T09:45:00Z",
        
      }
    ]
  
  