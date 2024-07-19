import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  CTooltip,
  CButton
} from '@coreui/react'
import { cifAU, freeSet } from '@coreui/icons';

const css = {}
const content = {
  profile: "Quản lý các thông tin cá nhân của bạn như số điện thoại, email, v.v",
  dashboard: "Tổng hợp những phần quan trọng",
  role: "Quản lý các cấp bậc phân quyền hiện tại của TIKITECH",
  package: "Quản lý các gói dịch vụ hiện có của TIKITECH, một gói dịch vụ sẽ chứa một hoặc nhiều tính năng",
  package_company: "Quản lý các gói dịch vụ mà bạn đăng ký của TIKITECH, một gói dịch vụ sẽ chứa một hoặc nhiều tính năng",
  feature: "Quản lý các tính năng hiện có của TIKITECH",
  accountSale: "Danh sách Sale của TIKITECH",
  accountCompany: "Danh sách Shop/Sale của TIKITECH",
  package_order: "Danh tất cả đơn hàng bao gồm các gói dịch vụ mà TIKITECH cung cấp cho khách hàng",
  create_order: "Tạo đơn hàng để TIKITECH cung cấp dịch vụ mà khách hàng cần",
  customer: "Danh sách mà người dùng đến và sử dụng dịch vụ",
  suggest: "Danh sách sản phẩm gợi ý khi người dùng sử dụng dịch vụ soi da",
  history_skin: "Danh sách lịch sử soi da của người dùng sử dụng dịch vụ soi da",
  brand: "Danh sách các thương hiệu hiện có",
  subType: "Danh sách các danh mục hiện có",
  color: "Danh sách các mã màu hiện có",
  product: "Danh sách các sản phẩm hiện có",
  reward_info: "Nội dung các chương trình khuyến mãi hiện tại",
  reward_customer: "Danh sách nhận quà của người dùng đã đến sử dụng dịch vụ",
  reward_type: "Danh sách các loại khuyến mãi",
  update_package: "Nâng cấp gói",
  contact: "Danh sach liên hệ",
}

const _navDashboard = [
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Tổng quan'],
    role: ['0', '1'],
    hidden: true
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Tổng quan',
    to: '/dashboard',
    hidden: true,
    icon: <CIcon style={css} content={freeSet.cilSpeedometer} customClasses="c-sidebar-nav-icon" />,
    role: ['0', '1'],
    badge: {
      color: 'info',
      text: <CTooltip placement={"right"} content={content.dashboard}>
              <CIcon content={freeSet.cilBellExclamation} />
            </CTooltip>,
    },
  },
]

const _navSoida = [
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Sản phẩm gợi ý'],
    role: ['0', '1', '2']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Nhãn hiệu sản phẩm soi da',
    to: '/brand_skin',
    icon: <CIcon style={css} content={freeSet.cilBookmark} customClasses="c-sidebar-nav-icon" />,
    role: ['0', '1', '2'],
    badge: {
      color: 'info',
      text: <CTooltip placement={"right"} content={content.brand}>
        <CIcon content={freeSet.cilBellExclamation} />
      </CTooltip>,
    }
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Hỗ trợ giảm lão hóa da',
    to: '/items/1',
    icon: <CIcon style={css} content={freeSet.cilMoodVeryGood} customClasses="c-sidebar-nav-icon" />,
    role: ['0', '1', '2'],
    badge: {
      color: 'info',
      text: <CTooltip placement={"right"} content={content.suggest}>
        <CIcon content={freeSet.cilBellExclamation} />
      </CTooltip>,
    },
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Hỗ trợ điều trị mụn',
    to: '/items/2',
    icon: <CIcon style={css} content={freeSet.cilMoodVeryGood} customClasses="c-sidebar-nav-icon" />,
    role: ['0', '1', '2'],
    badge: {
      color: 'info',
      text: <CTooltip placement={"right"} content={content.suggest}>
        <CIcon content={freeSet.cilBellExclamation} />
      </CTooltip>,
    },
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Hỗ trợ giảm quầng thâm mắt',
    to: '/items/3',
    icon: <CIcon style={css} content={freeSet.cilMoodVeryGood} customClasses="c-sidebar-nav-icon" />,
    role: ['0', '1', '2'],
    badge: {
      color: 'info',
      text: <CTooltip placement={"right"} content={content.suggest}>
        <CIcon content={freeSet.cilBellExclamation} />
      </CTooltip>,
    },
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Hỗ trợ giảm lỗ chân lông',
    to: '/items/4',
    icon: <CIcon style={css} content={freeSet.cilMoodVeryGood} customClasses="c-sidebar-nav-icon" />,
    role: ['0', '1', '2'],
    badge: {
      color: 'info',
      text: <CTooltip placement={"right"} content={content.suggest}>
        <CIcon content={freeSet.cilBellExclamation} />
      </CTooltip>,
    },
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Hỗ trợ giảm thâm nám da',
    to: '/items/5',
    icon: <CIcon style={css} content={freeSet.cilMoodVeryGood} customClasses="c-sidebar-nav-icon" />,
    role: ['0', '1', '2'],
    badge: {
      color: 'info',
      text: <CTooltip placement={"right"} content={content.suggest}>
        <CIcon content={freeSet.cilBellExclamation} />
      </CTooltip>,
    },
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Cấu hình hiển thị',
    to: '/skin/config',
    icon: <CIcon style={css} content={freeSet.cilMoodVeryGood} customClasses="c-sidebar-nav-icon" />,
    role: ['0', '1', '2'],
    badge: {
      color: 'info',
      text: <CTooltip placement={"right"} content={content.suggest}>
        <CIcon content={freeSet.cilBellExclamation} />
      </CTooltip>,
    },
  }


  
]


const _navDisplay = [
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Quản lý hiển thị'],
    role: [ '2']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Hiển thị trang web',
    to: '/cau-hinh-trang-web',
    icon: <CIcon style={css} content={freeSet.cilList} customClasses="c-sidebar-nav-icon" />,
    role: ['2']
  } 
]


const _navSpecialProduct = [
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Quản lý sản phẩm'],
    role: ['0', '1', '2']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Sản phẩm nổi bật',
    to: '/products-special',
    icon: <CIcon style={css} content={freeSet.cilBookmark} customClasses="c-sidebar-nav-icon" />,
    role: ['0', '1', '2'],
    badge: {
      color: 'info',
      text: <CTooltip placement={"right"} content={content.brand}>
        <CIcon content={freeSet.cilBellExclamation} />
      </CTooltip>,
    }
  }
]
const _navMakeUp = [
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Quản lý trang điểm'],
    role: ['0', '1', '2'],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Nhãn hiệu sản phẩm trang điểm',
    to: '/brand',
    icon: <CIcon style={css} content={freeSet.cilBookmark} customClasses="c-sidebar-nav-icon" />,
    role: ['0', '1', '2'],
    badge: {
      color: 'info',
      text: <CTooltip placement={"right"} content={content.brand}>
        <CIcon content={freeSet.cilBellExclamation} />
      </CTooltip>,
    }
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Danh mục trang điểm',
    to: '/subtype_makeup',
    icon: <CIcon style={css} content={freeSet.cilMenu} customClasses="c-sidebar-nav-icon" />,
    role: ['0', '1', '2'],
    badge: {
      color: 'info',
      text: <CTooltip placement={"right"} content={content.subType}>
        <CIcon content={freeSet.cilBellExclamation} />
      </CTooltip>,
    }
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Mã màu',
    to: '/color',
    icon: <CIcon style={css} content={freeSet.cilColorPalette} customClasses="c-sidebar-nav-icon" />,
    role: ['0', '1', '2'],
    badge: {
      color: 'info',
      text: <CTooltip placement={"right"} content={content.color}>
        <CIcon content={freeSet.cilBellExclamation} />
      </CTooltip>,
    }
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Sản phẩm',
    to: '/product',
    icon: <CIcon style={css} content={freeSet.cilTablet} customClasses="c-sidebar-nav-icon" />,
    role: ['0', '1', '2'],
    badge: {
      color: 'info',
      text: <CTooltip placement={"right"} content={content.product}>
        <CIcon content={freeSet.cilBellExclamation} />
      </CTooltip>,
    }
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Quản lý tóc'],
    role: ['0', '1', '2'],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Danh mục tóc',
    to: '/subtype_hair',
    icon: <CIcon style={css} content={freeSet.cilMenu} customClasses="c-sidebar-nav-icon" />,
    role: ['0', '1', '2'],
    badge: {
      color: 'info',
      text: <CTooltip placement={"right"} content={content.subType}>
        <CIcon content={freeSet.cilBellExclamation} />
      </CTooltip>,
    }
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Sản phẩm',
    to: '/product_hair',
    icon: <CIcon style={css} content={freeSet.cilTablet} customClasses="c-sidebar-nav-icon" />,
    role: ['0', '1', '2'],
    badge: {
      color: 'info',
      text: <CTooltip placement={"right"} content={content.product}>
        <CIcon content={freeSet.cilBellExclamation} />
      </CTooltip>,
    }
  },
]

const _navBeauty = [
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Quản lý điểm đẹp'],
    role: [ '0','1','2']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Quản lý điểm đẹp',
    to: '/quan-ly-diem-dep',
    icon: <CIcon style={css} content={freeSet.cilList} customClasses="c-sidebar-nav-icon" />,
    role: [ '0','1','2']
  } 
]

const _navTuvan = [
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Thông tin tư vấn'],
    role: [ '0','1','2']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Kênh Zalo/Messenger ',
    to: '/cau-hinh-tu-van',
    icon: <CIcon style={css} content={freeSet.cilList} customClasses="c-sidebar-nav-icon" />,
    role: [ '0','1','2']
  } 
]
const _navGame = [
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Quản lý game'],
    role: [ '0','1','2']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Game tuổi da',
    to: '/game-tuoi-da',
    icon: <CIcon style={css} content={freeSet.cilList} customClasses="c-sidebar-nav-icon" />,
    role: [ '0','1','2']
  } 
]
const _navOrther = [
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Quản lý chương trình khuyến mãi'],
    role: ['0', '1', '2'],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Chương trình khuyến mãi',
    icon: <CIcon style={css} content={freeSet.cilBell} customClasses="c-sidebar-nav-icon" />,
    _children: [{
      _tag: 'CSidebarNavItem',
      name: 'Nội dung khuyến mãi',
      to: '/reward_info',
      role: ['0', '1', '2'],
      badge: {
        color: 'info',
        text: <CTooltip placement={"right"} content={content.reward_info}>
          <CIcon content={freeSet.cilBellExclamation} />
        </CTooltip>,
      }
    }],
    role: ['0', '1', '2'],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Danh sách khuyến mãi',
    to: '/cus_request',
    icon: <CIcon style={css} content={freeSet.cilGift} customClasses="c-sidebar-nav-icon" />,
    role: ['0', '1', '2'],
    badge: {
      color: 'info',
      text: <CTooltip placement={"right"} content={content.reward_customer}>
        <CIcon content={freeSet.cilBellExclamation} />
      </CTooltip>,
    }
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Thông tin chung'],
    role: ['0', '1', '2'],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Thông tin tài khoản',
    to: '/profile',
    icon: <CIcon style={css} name="cil-user" customClasses="c-sidebar-nav-icon" />,
    role: ['0', '1', '2'],
    badge: {
      color: 'info',
      text: <CTooltip placement={"right"} content={content.profile}>
        <CIcon content={freeSet.cilBellExclamation} />
      </CTooltip>,
    }
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Quản lý phân quyền',
    to: '/role_manager',
    icon: <CIcon style={css} name="cil-people" customClasses="c-sidebar-nav-icon" />,
    role: ['0'],
    badge: {
      color: 'info',
      text: <CTooltip placement={"right"} content={content.role}>
        <CIcon content={freeSet.cilBellExclamation} />
      </CTooltip>,
    }
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Tính năng AI, AR',
    to: '/feature_customer',
    icon: <CIcon style={css} name="cil-laptop" customClasses="c-sidebar-nav-icon" />,
    role: ['2'],
    badge: {
      color: 'info',
      text: <CTooltip placement={"right"} content={content.package_company}>
        <CIcon content={freeSet.cilBellExclamation} />
      </CTooltip>,
    }
  },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Quản lý nâng cấp',
  //   to: '/update_package',
  //   icon: <CIcon style={css} content={freeSet.cilExpandUp} customClasses="c-sidebar-nav-icon" />,
  //   role: ['2'],
  //   badge: {
  //     color: 'info',
  //     text: <CTooltip placement={"right"} content={content.update_package}>
  //       <CIcon content={freeSet.cilBellExclamation} />
  //     </CTooltip>,
  //   }
  // }
  // ,
]

const _navContact = [
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Quản lý tính năng AI AR',
    icon: <CIcon style={css} content={freeSet.cilApplications} customClasses="c-sidebar-nav-icon" />,
    _children: [{
      _tag: 'CSidebarNavItem',
      name: 'Quản lý gói sản phẩm',
      to: '/plugin_manager',
      role: ['0'],
      badge: {
        color: 'info',
        text: <CTooltip placement={"right"} content={content.package}>
          <CIcon content={freeSet.cilBellExclamation} />
        </CTooltip>,
      }
    }, {
      _tag: 'CSidebarNavItem',
      name: 'Quản lý tính năng',
      to: '/manager-package',
      role: ['0'],
      badge: {
        color: 'info',
        text: <CTooltip placement={"right"} content={content.feature}>
          <CIcon content={freeSet.cilBellExclamation} />
        </CTooltip>,
      }
    }],
    role: ['0']
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Quản lý tài khoản',
    icon: <CIcon style={css} content={freeSet.cilList} customClasses="c-sidebar-nav-icon" />,
    _children: [{
      _tag: 'CSidebarNavItem',
      name: 'Danh sách Sale',
      to: '/subsale',
      role: ['2'],
      badge: {
        color: 'info',
        text: <CTooltip placement={"right"} content={content.accountSale}>
          <CIcon content={freeSet.cilBellExclamation} />
        </CTooltip>,
      }
    }, {
      _tag: 'CSidebarNavItem',
      name: 'Danh sách tài khoản Sale',
      to: '/saleAdmin',
      role: ['0'],
      badge: {
        color: 'info',
        text: <CTooltip placement={"right"} content={content.accountSale}>
          <CIcon content={freeSet.cilBellExclamation} />
        </CTooltip>,
      }
    }
     ],
    role: ['0', '1', '2'],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Quản lý đơn hàng',
    icon: <CIcon style={css} content={freeSet.cilFile} customClasses="c-sidebar-nav-icon" />,
    _children: [{
      _tag: 'CSidebarNavItem',
      name: 'Danh sách đơn hàng',
      to: '/list_order',
      role: ['0', '1'],
      badge: {
        color: 'info',
        text: <CTooltip placement={"right"} content={content.package_order}>
          <CIcon content={freeSet.cilBellExclamation} />
        </CTooltip>,
      } 
    }, {
      _tag: 'CSidebarNavItem',
      name: 'Tạo đơn hàng',
      to: '/plugin_create_order',
      role: ['0', '1'],
      badge: {
        color: 'info',
        text: <CTooltip placement={"right"} content={content.create_order}>
          <CIcon content={freeSet.cilBellExclamation} />
        </CTooltip>,
      }
    }],
    role: ['0', '1'],
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Thông tin liên hệ'],
    role: ['0', '1'],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Danh sách liên hệ',
    to: '/contact',
    role: ['0', '1'],
    icon: <CIcon style={css} content={freeSet.cilContact} customClasses="c-sidebar-nav-icon" />,
    badge: {
      color: 'info',
      text: <CTooltip placement={"right"} content={content.contact}>
        <CIcon content={freeSet.cilBellExclamation} />
      </CTooltip>,
    }
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Danh sách loại yêu cầu',
    to: '/type_request',
    role: ['0', '1'],
    icon: <CIcon style={css} content={freeSet.cilHamburgerMenu} customClasses="c-sidebar-nav-icon" />,
    badge: {
      color: 'info',
      text: <CTooltip placement={"right"} content={content.contact}>
        <CIcon content={freeSet.cilBellExclamation} />
      </CTooltip>,
    }
  },
  
  {
    _tag: 'CSidebarNavItem',
    name: 'Quản lý banner',
    to: '/banner',
    icon: <CIcon style={css} content={freeSet.cilList} customClasses="c-sidebar-nav-icon" />,
    role: ['0', '1'],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Danh sách banner',
    to: '/quan-ly-banner',
    icon: <CIcon style={css} content={freeSet.cilList} customClasses="c-sidebar-nav-icon" />,
    role: ['0', '1'],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Nhà cung cấp nổi bật',
    to: '/nha-cung-cap-noi-bat',
    icon: <CIcon style={css} content={freeSet.cilList} customClasses="c-sidebar-nav-icon" />,
    role: ['0', '1'],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Quản lý banner nhỏ',
    to: '/quan-ly-banner-nho',
    icon: <CIcon style={css} content={freeSet.cilList} customClasses="c-sidebar-nav-icon" />,
    role: ['0', '1'],
  },

  {
    _tag: 'CSidebarNavItem',
    name: 'Quản lý banner theo lượt soi',
    to: '/quan-ly-banner-nhieu-luot-soi',
    icon: <CIcon style={css} content={freeSet.cilList} customClasses="c-sidebar-nav-icon" />,
    role: ['0', '1'],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Quản lý banner chính',
    to: '/quan-ly-banner-chinh',
    icon: <CIcon style={css} content={freeSet.cilList} customClasses="c-sidebar-nav-icon" />,
    role: ['0', '1'],
  }
]
const _navLogOut = [
  {
    _tag: 'CSidebarNavItem',
    name: 'Đăng xuất',
    to: '/login',
    role: ['0', '1', '2', '5'],
    icon: <CIcon style={css} content={freeSet.cilAccountLogout} customClasses="c-sidebar-nav-icon" />
  },
]



const _navVendor = [
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Quản lý Shop/Sale'],
    role: ['0'],
  },
  
  {
    _tag: 'CSidebarNavItem',
    name: 'Danh sách Shop/Sale',
    icon: <CIcon style={css} content={freeSet.cilList} customClasses="c-sidebar-nav-icon" />,
    to: '/danh-sach-khach-hang',
    icon: <CIcon style={css} name="cil-people" customClasses="c-sidebar-nav-icon" />,
    role: ['0'],
    badge: {
      color: 'info',
      text: <CTooltip placement={"right"} content={content.role}>
        <CIcon content={freeSet.cilBellExclamation} />
      </CTooltip>,
    }
  }
  ]




  const _navOrder = [
    {
      _tag: 'CSidebarNavTitle',
      _children: ['Quản lý đơn hàng'],
      role: ['0'],
    },
    
    {
      _tag: 'CSidebarNavItem',
      name: 'Danh sách đơn hàng',
      icon: <CIcon style={css} content={freeSet.cilList} customClasses="c-sidebar-nav-icon" />,
      to: '/list_order',
      icon: <CIcon style={css} name="cil-people" customClasses="c-sidebar-nav-icon" />,
      role: ['0'],
      badge: {
        color: 'info',
        text: <CTooltip placement={"right"} content={content.role}>
          <CIcon content={freeSet.cilBellExclamation} />
        </CTooltip>,
      }
    },

    {
      _tag: 'CSidebarNavItem',
      name: 'Tạo đơn hàng',
      icon: <CIcon style={css} content={freeSet.cilList} customClasses="c-sidebar-nav-icon" />,
      to: '/plugin_create_order',
      icon: <CIcon style={css} name="cil-people" customClasses="c-sidebar-nav-icon" />,
      role: ['0'],
      badge: {
        color: 'info',
        text: <CTooltip placement={"right"} content={content.role}>
          <CIcon content={freeSet.cilBellExclamation} />
        </CTooltip>,
      }
    }
    ]
const _naveUser = [
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Quản lý người dùng'],
    role: ['0', '1', '2'],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Thống kê người dùng',
    to: '/customer',
    icon: <CIcon style={css} content={freeSet.cilUserPlus} customClasses="c-sidebar-nav-icon" />,
    role: ['0', '1', '2'],
    badge: {
      color: 'info',
      text: <CTooltip placement={"right"} content={content.customer}>
        <CIcon content={freeSet.cilBellExclamation} />
      </CTooltip>,
    }
  },

  {
    _tag: 'CSidebarNavItem',
    name: 'Người dùng đã đăng ký',
    icon: <CIcon style={css} content={freeSet.cilList} customClasses="c-sidebar-nav-icon" />,
    to: '/danh-sach-nguoi-dung',
    icon: <CIcon style={css} name="cil-people" customClasses="c-sidebar-nav-icon" />,
    role: ['0', '1','2'],
    badge: {
      color: 'info',
      text: <CTooltip placement={"right"} content={content.role}>
        <CIcon content={freeSet.cilBellExclamation} />
      </CTooltip>,
    }
  },
 
  {
    _tag: 'CSidebarNavItem',
    name: 'Lịch sử soi da',
    to: '/historyskin',
    icon: <CIcon style={css} content={freeSet.cilHistory} customClasses="c-sidebar-nav-icon" />,
    role: ['0', '1', '2'],
    badge: {
      color: 'info',
      text: <CTooltip nẻplacement={"right"} content={content.history_skin}>
        <CIcon content={freeSet.cilBellExclamation} />
      </CTooltip>,
    }
  }]


  const _naveBanner = [
    {
      _tag: 'CSidebarNavTitle',
      _children: ['Banner trang chủ'],
      role: ['0', '1', '2'],
    },
    {
      _tag: 'CSidebarNavItem',
      name: 'Danh sách người dùng',
      to: '/customer',
      icon: <CIcon style={css} content={freeSet.cilUserPlus} customClasses="c-sidebar-nav-icon" />,
      role: ['0', '1'],
      badge: {
        color: 'info',
        text: <CTooltip placement={"right"} content={content.customer}>
          <CIcon content={freeSet.cilBellExclamation} />
        </CTooltip>,
      }
    },
  
    {
      _tag: 'CSidebarNavItem',
      name: 'Danh sách Shop/Sale',
      icon: <CIcon style={css} content={freeSet.cilList} customClasses="c-sidebar-nav-icon" />,
      to: '/danh-sach-nguoi-dung',
      icon: <CIcon style={css} name="cil-people" customClasses="c-sidebar-nav-icon" />,
      role: ['0', '1','2'],
      badge: {
        color: 'info',
        text: <CTooltip placement={"right"} content={content.role}>
          <CIcon content={freeSet.cilBellExclamation} />
        </CTooltip>,
      }
    },
    {
      _tag: 'CSidebarNavItem',
      name: 'Danh sách end user',
      icon: <CIcon style={css} content={freeSet.cilList} customClasses="c-sidebar-nav-icon" />,
      to: '/end_user',
      icon: <CIcon style={css} name="cil-people" customClasses="c-sidebar-nav-icon" />,
      role: ['0', '1'],
      badge: {
        color: 'info',
        text: <CTooltip placement={"right"} content={content.role}>
          <CIcon content={freeSet.cilBellExclamation} />
        </CTooltip>,
      }
    },
    {
      _tag: 'CSidebarNavItem',
      name: 'Lịch sử soi da',
      to: '/historyskin',
      icon: <CIcon style={css} content={freeSet.cilHistory} customClasses="c-sidebar-nav-icon" />,
      role: ['0', '1', '2'],
      badge: {
        color: 'info',
        text: <CTooltip placement={"right"} content={content.history_skin}>
          <CIcon content={freeSet.cilBellExclamation} />
        </CTooltip>,
      }
    }
  
  
  
  ]



  const _navManagementConclue = [
    {
      _tag: 'CSidebarNavTitle',
      _children: ['Quản lý kết luận và chi tiết'],
      role: ['0', '1', '2'],
    },
    {
      _tag: 'CSidebarNavItem',
      name: 'Kết luận chi tiết',
  
      to: '/skin/configContent',
      icon: <CIcon style={css} content={freeSet.cilMoodVeryGood} customClasses="c-sidebar-nav-icon" />,
      role: ['0', '1', '2'],
      badge: {
        color: 'info',
        text: <CTooltip placement={"right"} content={content.suggest}>
          <CIcon content={freeSet.cilBellExclamation} />
        </CTooltip>,
      },
    },
     {
      _tag: 'CSidebarNavItem',
      name: 'Tư vấn tổng quát',
  
      to: '/skin/configOverView',
      icon: <CIcon style={css} content={freeSet.cilMoodVeryGood} customClasses="c-sidebar-nav-icon" />,
      role: ['0', '1', '2'],
      badge: {
        color: 'info',
        text: <CTooltip placement={"right"} content={content.suggest}>
          <CIcon content={freeSet.cilBellExclamation} />
        </CTooltip>,
      },
    }
    ]



    const _navManagementBook = [
      {
        _tag: 'CSidebarNavTitle',
        _children: ['Quản lý sách'],
        role: ['0', '1', '2'],
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Sách English',
    
        to: '/book/sach-tieng-anh',
        icon: <CIcon style={css} content={freeSet.cilMoodVeryGood} customClasses="c-sidebar-nav-icon" />,
        role: ['0', '1', '2'],
        badge: {
          color: 'info',
          text: <CTooltip placement={"right"} content={content.suggest}>
            <CIcon content={freeSet.cilBellExclamation} />
          </CTooltip>,
        },
      },
       {
        _tag: 'CSidebarNavItem',
        name: 'Sách nuôi dạy con',
    
        to: '/book/sach-nuoi-day-con',
        icon: <CIcon style={css} content={freeSet.cilMoodVeryGood} customClasses="c-sidebar-nav-icon" />,
        role: ['0', '1', '2'],
        badge: {
          color: 'info',
          text: <CTooltip placement={"right"} content={content.suggest}>
            <CIcon content={freeSet.cilBellExclamation} />
          </CTooltip>,
        }
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Tạp chí thời trang',
    
        to: '/book/tap-chi-thoi-trang',
        icon: <CIcon style={css} content={freeSet.cilMoodVeryGood} customClasses="c-sidebar-nav-icon" />,
        role: ['0', '1', '2'],
        badge: {
          color: 'info',
          text: <CTooltip placement={"right"} content={content.suggest}>
            <CIcon content={freeSet.cilBellExclamation} />
          </CTooltip>
        }
       
    },
    {
      _tag: 'CSidebarNavItem',
      name: 'Lý thuyết và sách nói',
  
      to: '/book/ly-thuyet-va-sach-noi',
      icon: <CIcon style={css} content={freeSet.cilMoodVeryGood} customClasses="c-sidebar-nav-icon" />,
      role: ['0', '1', '2'],
      badge: {
        color: 'info',
        text: <CTooltip placement={"right"} content={content.suggest}>
          <CIcon content={freeSet.cilBellExclamation} />
        </CTooltip>
      }
     
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Tiểu thuyết',

    to: '/book/tieu-thuyet',
    icon: <CIcon style={css} content={freeSet.cilMoodVeryGood} customClasses="c-sidebar-nav-icon" />,
    role: ['0', '1', '2'],
    badge: {
      color: 'info',
      text: <CTooltip placement={"right"} content={content.suggest}>
        <CIcon content={freeSet.cilBellExclamation} />
      </CTooltip>
    }
   
},
{
  _tag: 'CSidebarNavItem',
  name: 'Truyện ngắn',

  to: '/book/truyen-ngan',
  icon: <CIcon style={css} content={freeSet.cilMoodVeryGood} customClasses="c-sidebar-nav-icon" />,
  role: ['0', '1', '2'],
  badge: {
    color: 'info',
    text: <CTooltip placement={"right"} content={content.suggest}>
      <CIcon content={freeSet.cilBellExclamation} />
    </CTooltip>
  }
 
},
{
  _tag: 'CSidebarNavItem',
  name: 'Lịch sử',

  to: '/book/lich-su',
  icon: <CIcon style={css} content={freeSet.cilMoodVeryGood} customClasses="c-sidebar-nav-icon" />,
  role: ['0', '1', '2'],
  badge: {
    color: 'info',
    text: <CTooltip placement={"right"} content={content.suggest}>
      <CIcon content={freeSet.cilBellExclamation} />
    </CTooltip>
  }
 
},
{
  _tag: 'CSidebarNavItem',
  name: 'Sách văn học',

  to: '/book/sach-van-hoc',
  icon: <CIcon style={css} content={freeSet.cilMoodVeryGood} customClasses="c-sidebar-nav-icon" />,
  role: ['0', '1', '2'],
  badge: {
    color: 'info',
    text: <CTooltip placement={"right"} content={content.suggest}>
      <CIcon content={freeSet.cilBellExclamation} />
    </CTooltip>
  }
 
},
{
  _tag: 'CSidebarNavItem',
  name: 'Sách kinh tế',

  to: '/book/sach-kinh-te',
  icon: <CIcon style={css} content={freeSet.cilMoodVeryGood} customClasses="c-sidebar-nav-icon" />,
  role: ['0', '1', '2'],
  badge: {
    color: 'info',
    text: <CTooltip placement={"right"} content={content.suggest}>
      <CIcon content={freeSet.cilBellExclamation} />
    </CTooltip>
  }
 
},
{
  _tag: 'CSidebarNavItem',
  name: 'Sách thiếu nhi',

  to: '/book/sach-thieu-nhi',
  icon: <CIcon style={css} content={freeSet.cilMoodVeryGood} customClasses="c-sidebar-nav-icon" />,
  role: ['0', '1', '2'],
  badge: {
    color: 'info',
    text: <CTooltip placement={"right"} content={content.suggest}>
      <CIcon content={freeSet.cilBellExclamation} />
    </CTooltip>
  }
 
},
{
  _tag: 'CSidebarNavItem',
  name: 'Sách kĩ năng sống',

  to: '/book/sach-ky-nang-song',
  icon: <CIcon style={css} content={freeSet.cilMoodVeryGood} customClasses="c-sidebar-nav-icon" />,
  role: ['0', '1', '2'],
  badge: {
    color: 'info',
    text: <CTooltip placement={"right"} content={content.suggest}>
      <CIcon content={freeSet.cilBellExclamation} />
    </CTooltip>
  }
 
},
{
  _tag: 'CSidebarNavItem',
  name: 'Sách bà mẹ - Em bé',

  to: '/book/sach-ba-me-em-be',
  icon: <CIcon style={css} content={freeSet.cilMoodVeryGood} customClasses="c-sidebar-nav-icon" />,
  role: ['0', '1', '2'],
  badge: {
    color: 'info',
    text: <CTooltip placement={"right"} content={content.suggest}>
      <CIcon content={freeSet.cilBellExclamation} />
    </CTooltip>
  }
 
},
{
  _tag: 'CSidebarNavItem',
  name: 'Sách giáo khoa - giáo trình',

  to: '/book/sach-giao-khoa-giao-trinh',
  icon: <CIcon style={css} content={freeSet.cilMoodVeryGood} customClasses="c-sidebar-nav-icon" />,
  role: ['0', '1', '2'],
  badge: {
    color: 'info',
    text: <CTooltip placement={"right"} content={content.suggest}>
      <CIcon content={freeSet.cilBellExclamation} />
    </CTooltip>
  }
 
},
{
  _tag: 'CSidebarNavItem',
  name: 'Sách học ngoại ngữ',

  to: '/book/sach-hoc-ngoai-ngu',
  icon: <CIcon style={css} content={freeSet.cilMoodVeryGood} customClasses="c-sidebar-nav-icon" />,
  role: ['0', '1', '2'],
  badge: {
    color: 'info',
    text: <CTooltip placement={"right"} content={content.suggest}>
      <CIcon content={freeSet.cilBellExclamation} />
    </CTooltip>
  }
 
},
{
  _tag: 'CSidebarNavItem',
  name: 'Sách tham khảo',

  to: '/book/sach-tham-khao',
  icon: <CIcon style={css} content={freeSet.cilMoodVeryGood} customClasses="c-sidebar-nav-icon" />,
  role: ['0', '1', '2'],
  badge: {
    color: 'info',
    text: <CTooltip placement={"right"} content={content.suggest}>
      <CIcon content={freeSet.cilBellExclamation} />
    </CTooltip>
  }
 
},
{
  _tag: 'CSidebarNavItem',
  name: 'Từ điển',

  to: '/book/tu-dien',
  icon: <CIcon style={css} content={freeSet.cilMoodVeryGood} customClasses="c-sidebar-nav-icon" />,
  role: ['0', '1', '2'],
  badge: {
    color: 'info',
    text: <CTooltip placement={"right"} content={content.suggest}>
      <CIcon content={freeSet.cilBellExclamation} />
    </CTooltip>
  }
 
},
{
  _tag: 'CSidebarNavItem',
  name: 'Kiến thưc tổng hợp',

  to: '/book/kien-thuc-tong-hop',
  icon: <CIcon style={css} content={freeSet.cilMoodVeryGood} customClasses="c-sidebar-nav-icon" />,
  role: ['0', '1', '2'],
  badge: {
    color: 'info',
    text: <CTooltip placement={"right"} content={content.suggest}>
      <CIcon content={freeSet.cilBellExclamation} />
    </CTooltip>
  }
 
},
{
  _tag: 'CSidebarNavItem',
  name: 'Khoa học kĩ thuật',

  to: '/book/khoa-hoc-ki-thuat',
  icon: <CIcon style={css} content={freeSet.cilMoodVeryGood} customClasses="c-sidebar-nav-icon" />,
  role: ['0', '1', '2'],
  badge: {
    color: 'info',
    text: <CTooltip placement={"right"} content={content.suggest}>
      <CIcon content={freeSet.cilBellExclamation} />
    </CTooltip>
  }
 
},
{
  _tag: 'CSidebarNavItem',
  name: 'Điện ảnh - nhạc - hoạ',

  to: '/book/khoa-hoc-ki-thuat',
  icon: <CIcon style={css} content={freeSet.cilMoodVeryGood} customClasses="c-sidebar-nav-icon" />,
  role: ['0', '1', '2'],
  badge: {
    color: 'info',
    text: <CTooltip placement={"right"} content={content.suggest}>
      <CIcon content={freeSet.cilBellExclamation} />
    </CTooltip>
  }
 
},

{
  _tag: 'CSidebarNavItem',
  name: 'Truyện tranh, Manga, comic',

  to: '/book/truyen-tranh-manga-comic',
  icon: <CIcon style={css} content={freeSet.cilMoodVeryGood} customClasses="c-sidebar-nav-icon" />,
  role: ['0', '1', '2'],
  badge: {
    color: 'info',
    text: <CTooltip placement={"right"} content={content.suggest}>
      <CIcon content={freeSet.cilBellExclamation} />
    </CTooltip>
  }
 
},
{
  _tag: 'CSidebarNavItem',
  name: 'Sách tôn giáo tâm linh',

  to: '/book/sach-ton-giao-tam-linh',
  icon: <CIcon style={css} content={freeSet.cilMoodVeryGood} customClasses="c-sidebar-nav-icon" />,
  role: ['0', '1', '2'],
  badge: {
    color: 'info',
    text: <CTooltip placement={"right"} content={content.suggest}>
      <CIcon content={freeSet.cilBellExclamation} />
    </CTooltip>
  }
},
  {
    _tag: 'CSidebarNavItem',
    name: 'Sách văn hoá - địa lý - giáo dục',
  
    to: '/book/sach-van-hoa-dia-ly-du-lich',
    icon: <CIcon style={css} content={freeSet.cilMoodVeryGood} customClasses="c-sidebar-nav-icon" />,
    role: ['0', '1', '2'],
    badge: {
      color: 'info',
      text: <CTooltip placement={"right"} content={content.suggest}>
        <CIcon content={freeSet.cilBellExclamation} />
      </CTooltip>
    }
 
},
{
  _tag: 'CSidebarNavItem',
  name: 'Sách chính trị -pháp lý',

  to: '/book/sach-chinh-tri-phap-ly',
  icon: <CIcon style={css} content={freeSet.cilMoodVeryGood} customClasses="c-sidebar-nav-icon" />,
  role: ['0', '1', '2'],
  badge: {
    color: 'info',
    text: <CTooltip placement={"right"} content={content.suggest}>
      <CIcon content={freeSet.cilBellExclamation} />
    </CTooltip>
  }},

  {
    _tag: 'CSidebarNavItem',
    name: 'Sách Nông - Lâm - Ngư nghiệp',
  
    to: '/book/sach-nong-lam-ngu-nghiep',
    icon: <CIcon style={css} content={freeSet.cilMoodVeryGood} customClasses="c-sidebar-nav-icon" />,
    role: ['0', '1', '2'],
    badge: {
      color: 'info',
      text: <CTooltip placement={"right"} content={content.suggest}>
        <CIcon content={freeSet.cilBellExclamation} />
      </CTooltip>
    }
},
{
  _tag: 'CSidebarNavItem',
  name: 'Sách công nghệ thông tin',

  to: '/book/sach-cong-nghe-thong-tin',
  icon: <CIcon style={css} content={freeSet.cilMoodVeryGood} customClasses="c-sidebar-nav-icon" />,
  role: ['0', '1', '2'],
  badge: {
    color: 'info',
    text: <CTooltip placement={"right"} content={content.suggest}>
      <CIcon content={freeSet.cilBellExclamation} />
    </CTooltip>
  }
},
{
  _tag: 'CSidebarNavItem',
  name: 'Sách y học ',

  to: '/book/sach-y-hoc',
  icon: <CIcon style={css} content={freeSet.cilMoodVeryGood} customClasses="c-sidebar-nav-icon" />,
  role: ['0', '1', '2'],
  badge: {
    color: 'info',
    text: <CTooltip placement={"right"} content={content.suggest}>
      <CIcon content={freeSet.cilBellExclamation} />
    </CTooltip>
  }
},
{
  _tag: 'CSidebarNavItem',
  name: 'Tạp chí - catelogue ',

  to: '/book/tap-chi-catalogue',
  icon: <CIcon style={css} content={freeSet.cilMoodVeryGood} customClasses="c-sidebar-nav-icon" />,
  role: ['0', '1', '2'],
  badge: {
    color: 'info',
    text: <CTooltip placement={"right"} content={content.suggest}>
      <CIcon content={freeSet.cilBellExclamation} />
    </CTooltip>
  }
},
{
  _tag: 'CSidebarNavItem',
  name: 'Tâm lý giới tính',

  to: '/book/tam-ly-gioi-tinh',
  icon: <CIcon style={css} content={freeSet.cilMoodVeryGood} customClasses="c-sidebar-nav-icon" />,
  role: ['0', '1', '2'],
  badge: {
    color: 'info',
    text: <CTooltip placement={"right"} content={content.suggest}>
      <CIcon content={freeSet.cilBellExclamation} />
    </CTooltip>
  }
},
{
  _tag: 'CSidebarNavItem',
  name: 'Thưởng thức - gia đình',

  to: '/book/thuong-thuc-gia-dinh',
  icon: <CIcon style={css} content={freeSet.cilMoodVeryGood} customClasses="c-sidebar-nav-icon" />,
  role: ['0', '1', '2'],
  badge: {
    color: 'info',
    text: <CTooltip placement={"right"} content={content.suggest}>
      <CIcon content={freeSet.cilBellExclamation} />
    </CTooltip>
  }
},
{
  _tag: 'CSidebarNavItem',
  name: 'Thể duc - thể thao',
  
  to: '/book/the-duc-the-thao',
  icon: <CIcon style={css} content={freeSet.cilMoodVeryGood} customClasses="c-sidebar-nav-icon" />,
  role: ['0', '1', '2'],
  badge: {
    color: 'info',
    text: <CTooltip placement={"right"} content={content.suggest}>
      <CIcon content={freeSet.cilBellExclamation} />
    </CTooltip>
  }
}
      ]
  

export default [_navVendor, _naveUser,_navManagementConclue, _navBeauty,_navTuvan,_navSoida,_navGame,_navDisplay, _navOrther, _navContact, _navLogOut,_navSpecialProduct  ]
