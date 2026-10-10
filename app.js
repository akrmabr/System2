const CONFIG = window.NAJAH_SUPABASE_CONFIG;
const app = document.getElementById('app');
const AUTH_STORAGE_KEY = 'najah_supabase_auth';

const ACTIVITY_CATALOG = [
  { key: 'homeware', label: 'محلات الأواني المنزلية', icon: '🍽️', specializedFields: [['setType','نوع الطقم/القطعة'],['material','الخامة'],['size','المقاس'],['color','اللون'],['model','الموديل'],['wholesalePrice','سعر الجملة'],['retailPack','العبوة']], sidebar: ['dashboard','products','sales','purchases','inventory','reports','settings'] },
  { key: 'furniture', label: 'محلات الأثاثات', icon: '🛋️', specializedFields: [['model','الموديل'],['size','المقاسات'],['color','الألوان'],['material','الخامة'],['customOrder','طلب خاص'],['downPayment','العربون'],['deliveryDate','موعد التسليم'],['assembly','تركيب وضمان']], sidebar: ['dashboard','products','sales','purchases','inventory','reports','settings'] },
  { key: 'supermarket', label: 'السوبر ماركت والبقالات', icon: '🛒', specializedFields: [['barcode','الباركود'],['fastSell','بيع سريع'],['weightBased','يباع بالوزن'],['expiryDate','تاريخ الصلاحية'],['batchNo','رقم التشغيلة'],['unit','الوحدة'],['offerPrice','سعر العرض']], sidebar: ['dashboard','products','sales','purchases','inventory','reports','settings'] },
  { key: 'phones', label: 'محلات الهواتف والإلكترونيات', icon: '📱', specializedFields: [['imei','IMEI'],['serialNo','الرقم التسلسلي'],['warrantyMonths','أشهر الضمان'],['deviceType','نوع الجهاز'],['buyerNotes','بيانات المشتري'],['maintenance','الصيانة']], sidebar: ['dashboard','products','sales','services','purchases','inventory','reports','settings'] },
  { key: 'clothing', label: 'محلات الملابس', icon: '👕', specializedFields: [['sizes','المقاسات'],['colors','الألوان'],['model','الموديل'],['brand','الماركة'],['variants','المقاسات المتعددة'],['exchangePolicy','سياسة التبديل']], sidebar: ['dashboard','products','sales','purchases','inventory','reports','settings'] },
  { key: 'cosmetics', label: 'محلات مستحضرات التجميل', icon: '💄', specializedFields: [['size','الحجم'],['brand','الماركة'],['batchNo','التشغيلة'],['expiryDate','الصلاحية'],['alertWindow','تنبيه انتهاء الصلاحية']], sidebar: ['dashboard','products','sales','purchases','inventory','reports','settings'] },
  { key: 'building', label: 'محلات مواد البناء', icon: '🧱', specializedFields: [['unit','الوحدة'],['conversion','التحويل بين الوحدات'],['delivery','التوصيل'],['weight','الوزن/الطن'],['bags','الأكياس']], sidebar: ['dashboard','products','sales','purchases','inventory','reports','settings'] },
  { key: 'appliances', label: 'محلات الأجهزة الكهربائية', icon: '🔌', specializedFields: [['model','الموديل'],['serialNo','الرقم التسلسلي'],['warrantyMonths','مدة الضمان'],['deviceType','نوع الجهاز']], sidebar: ['dashboard','products','sales','purchases','inventory','reports','settings'] },
  { key: 'stationery', label: 'محلات المكتبات والأدوات المدرسية', icon: '📚', specializedFields: [['category','التصنيف'],['brand','الماركة'],['size','المقاس'],['unit','وحدة البيع'],['barcode','الباركود']], sidebar: ['dashboard','products','sales','purchases','inventory','reports','settings'] },
  { key: 'perfume', label: 'محلات العطور', icon: '🧴', specializedFields: [['fragranceType','النوع'],['brand','الماركة'],['size','الحجم'],['concentration','التركيز'],['packaging','العبوة']], sidebar: ['dashboard','products','sales','purchases','inventory','reports','settings'] },
  { key: 'shoes_bags', label: 'محلات الأحذية والحقائب', icon: '👟', specializedFields: [['model','الموديل'],['sizes','المقاسات'],['colors','الألوان'],['material','الخامة'],['brand','الماركة'],['barcode','الباركود']], sidebar: ['dashboard','products','sales','purchases','inventory','reports','settings'] },
  { key: 'auto_parts', label: 'محلات قطع غيار السيارات', icon: '🚗', specializedFields: [['partNo','رقم القطعة'],['brand','الماركة'],['compatibleCars','الموديلات المتوافقة'],['manufacturer','الشركة المصنعة']], sidebar: ['dashboard','products','sales','purchases','inventory','reports','settings'] },
  { key: 'sanitary', label: 'محلات الأدوات الصحية', icon: '🚿', specializedFields: [['toolType','نوع الأداة'],['size','المقاس'],['material','الخامة'],['brand','الماركة'],['packaging','العبوة']], sidebar: ['dashboard','products','sales','purchases','inventory','reports','settings'] },
  { key: 'electrical_tools', label: 'محلات الأدوات الكهربائية', icon: '💡', specializedFields: [['category','الصنف'],['specs','المواصفات الفنية'],['size','المقاس'],['brand','الماركة'],['warrantyMonths','مدة الضمان']], sidebar: ['dashboard','products','sales','purchases','inventory','reports','settings'] },
  { key: 'computers', label: 'محلات الحواسيب', icon: '💻', specializedFields: [['componentType','نوع الجهاز/المكوّن'],['specs','المواصفات الفنية'],['serialNo','الرقم التسلسلي'],['accessories','الملحقات'],['warrantyMonths','مدة الضمان']], sidebar: ['dashboard','products','sales','services','purchases','inventory','reports','settings'] },
];

const PAYMENT_METHODS = [
  { value: 'cash', label: 'نقدي' },
  { value: 'electronic', label: 'إلكتروني' },
  { value: 'credit', label: 'آجل' },
];

const PERMISSIONS = [
  { key: 'manage_users', label: 'إدارة المستخدمين' },
  { key: 'manage_branches', label: 'إدارة الفروع' },
  { key: 'view_reports', label: 'عرض التقارير' },
  { key: 'view_profit', label: 'عرض الأرباح' },
  { key: 'manage_sales', label: 'إدارة المبيعات' },
  { key: 'manage_purchases', label: 'إدارة المشتريات' },
  { key: 'manage_stock', label: 'إدارة المخزون' },
  { key: 'edit_prices', label: 'تعديل الأسعار' },
  { key: 'void_invoices', label: 'إلغاء الفواتير والمرتجعات' },
];

const ROLE_TEMPLATES = {
  owner: Object.fromEntries(PERMISSIONS.map((p) => [p.key, true])),
  manager: { manage_users: true, manage_branches: true, view_reports: true, view_profit: true, manage_sales: true, manage_purchases: true, manage_stock: true, edit_prices: true, void_invoices: true },
  accountant: { manage_users: false, manage_branches: false, view_reports: true, view_profit: true, manage_sales: false, manage_purchases: true, manage_stock: false, edit_prices: false, void_invoices: false },
  storekeeper: { manage_users: false, manage_branches: false, view_reports: false, view_profit: false, manage_sales: false, manage_purchases: true, manage_stock: true, edit_prices: false, void_invoices: false },
  cashier: { manage_users: false, manage_branches: false, view_reports: false, view_profit: false, manage_sales: true, manage_purchases: false, manage_stock: false, edit_prices: false, void_invoices: false },
  employee: { manage_users: false, manage_branches: false, view_reports: false, view_profit: false, manage_sales: false, manage_purchases: false, manage_stock: false, edit_prices: false, void_invoices: false },
};

const state = {
  screen: 'loading',
  authTab: 'register',
  registrationActivity: ACTIVITY_CATALOG[0].key,
  session: null,
  adminData: null,
  adminExists: null,
  adminLoginMode: 'login',
  section: 'dashboard',
  cart: [],
  posSearch: '',
  invoicePrintSize: '80',
  syncing: false,
  notice: '',
  statusFeed: [],
  releaseTag: 'RC-1',
};

const h = (strings, ...values) => strings.reduce((acc, str, i) => acc + str + (values[i] ?? ''), '');
const uid = (prefix = 'id') => `${prefix}_${crypto.randomUUID()}`;
const now = () => new Date().toISOString();
const formatDate = (v) => (v ? new Date(v).toLocaleString('ar-SA') : '-');
const currentTenant = () => state.session?.tenant || null;
const currentActivityConfig = () => ACTIVITY_CATALOG.find((a) => a.key === currentTenant()?.activityKey);
const money = (value) => new Intl.NumberFormat('ar-SA', { style: 'currency', currency: currentTenant()?.currency || 'USD', maximumFractionDigits: 2 }).format(Number(value || 0));
const activeBranchName = () => state.session?.branches?.find((b) => b.id === state.session.branchId)?.name || '-';
const currentUserPermissions = () => state.session?.user?.permissions || {};
const can = (permissionKey) => state.session?.user?.role === 'owner' || currentUserPermissions()[permissionKey] === true;

function authState() {
  try { return JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY) || 'null'); } catch { return null; }
}
function setAuthState(data) { localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data)); }
function clearAuthState() { localStorage.removeItem(AUTH_STORAGE_KEY); }
function pushStatus(kind, text) {
  const message = String(text || '').trim();
  if (!message) return;
  state.notice = message;
  state.statusFeed = [{ id: uid('status'), kind, text: message, at: now() }, ...state.statusFeed].slice(0, 10);
}
function setNotice(text) { pushStatus('success', text); }
function setErrorNotice(error) {
  const message = humanizeError(error);
  pushStatus('error', message);
  return message;
}
function validateConfig() {
  if (!CONFIG?.url || !CONFIG?.anonKey || !CONFIG?.functionsBase || !CONFIG?.projectRef) throw new Error('missing_config');
}
function humanizeError(error) {
  const message = String(error?.message || error || '');
  const map = {
    no_auth: 'انتهت الجلسة. سجّل الدخول مرة أخرى.',
    unauthorized: 'ليس لديك صلاحية لتنفيذ هذا الإجراء.',
    not_platform_admin: 'هذا الحساب ليس حساب إدارة مركزية.',
    platform_admin_already_exists: 'تم إنشاء مدير المنصة بالفعل. استخدم تسجيل الدخول للإدارة.',
    email_and_password_required: 'يرجى إدخال البريد الإلكتروني وكلمة المرور.',
    missing_manage_branches_permission: 'ليس لديك صلاحية إدارة الفروع.',
    missing_manage_users_permission: 'ليس لديك صلاحية إدارة المستخدمين.',
    missing_config: 'إعدادات الربط غير مكتملة. تأكد من ملف supabase.config.js.',
  };
  if (map[message]) return map[message];
  if (message.includes('fetch')) return 'تعذر الوصول إلى الخادم الآن. تحقق من الاتصال ثم أعد المحاولة.';
  if (message.startsWith('request_failed_')) return 'تعذر إكمال الطلب الآن. أعد المحاولة بعد لحظات.';
  return message || 'حدث خطأ غير متوقع. حاول مرة أخرى.';
}

async function apiFetch(url, options = {}) {
  validateConfig();
  const res = await fetch(url, options);
  const text = await res.text();
  let json = {};
  try { json = text ? JSON.parse(text) : {}; } catch { json = { raw: text }; }
  if (!res.ok || json.ok === false) throw new Error(json.message || json.error_description || json.error || `request_failed_${res.status}`);
  return json;
}

function headers(withAuth = false) {
  const hdr = { apikey: CONFIG.anonKey, 'Content-Type': 'application/json' };
  const auth = authState();
  if (withAuth && auth?.access_token) hdr.Authorization = `Bearer ${auth.access_token}`;
  return hdr;
}

async function callEdge(slug, payload = {}, withAuth = false) {
  return apiFetch(`${CONFIG.functionsBase}/${slug}`, {
    method: 'POST',
    headers: headers(withAuth),
    body: JSON.stringify(payload),
  });
}

async function restInsert(table, payload) {
  return apiFetch(`${CONFIG.url}/rest/v1/${table}`, {
    method: 'POST',
    headers: { ...headers(true), Prefer: 'return=representation' },
    body: JSON.stringify(payload),
  });
}

async function restUpdate(table, values, params) {
  return apiFetch(`${CONFIG.url}/rest/v1/${table}?${new URLSearchParams(params).toString()}`, {
    method: 'PATCH',
    headers: { ...headers(true), Prefer: 'return=representation' },
    body: JSON.stringify(values),
  });
}

async function authLogin(email, password) {
  const result = await apiFetch(`${CONFIG.url}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: headers(false),
    body: JSON.stringify({ email, password }),
  });
  setAuthState({ access_token: result.access_token, refresh_token: result.refresh_token, user: result.user });
  return result;
}

async function authLogout() {
  const auth = authState();
  if (auth?.access_token) {
    try {
      await fetch(`${CONFIG.url}/auth/v1/logout`, { method: 'POST', headers: { apikey: CONFIG.anonKey, Authorization: `Bearer ${auth.access_token}` } });
    } catch {}
  }
  clearAuthState();
}

function normalizeSession(payload) {
  const products = (payload.products || []).map((p) => ({
    id: p.id,
    name: p.name,
    code: p.sku,
    barcode: p.barcode || '',
    purchasePrice: Number(p.purchase_price || 0),
    salePrice: Number(p.sale_price || 0),
    stockQty: Number(p.stock_qty || 0),
    reservedQty: Number(p.reserved_qty || 0),
    minStock: Number(p.min_stock || 0),
    activityData: p.activity_data || {},
    branchId: p.branch_id,
    createdAt: p.created_at,
  }));
  const branchAccess = payload.access || [];
  return {
    user: {
      id: payload.user.id,
      email: payload.user.email,
      role: payload.user.role,
      username: payload.user.username,
      displayName: payload.user.displayName,
      permissions: payload.user.permissions || {},
    },
    tenant: {
      id: payload.tenant.id,
      shopName: payload.tenant.shop_name,
      ownerName: payload.tenant.owner_name,
      activityKey: payload.tenant.activity_key,
      country: payload.tenant.country,
      currency: payload.tenant.currency_code,
      phone: payload.tenant.phone,
      address: payload.tenant.address,
      taxNo: payload.tenant.tax_no,
      licenseStatus: payload.tenant.license_status,
    },
    branchId: payload.branchId,
    branches: (payload.branches || []).map((b) => ({ id: b.id, name: b.name, phone: b.phone, address: b.address })),
    products,
    suppliers: (payload.suppliers || []).map((s) => ({ id: s.id, name: s.name, phone: s.phone, address: s.address })),
    sales: (payload.sales || []).map((s) => ({
      id: s.id,
      invoiceNo: s.invoice_no,
      paymentMethod: s.payment_method,
      subtotal: Number(s.subtotal || 0),
      grandTotal: Number(s.grand_total || 0),
      paid: Number(s.paid_amount || 0),
      remaining: Number(s.remaining_amount || 0),
      createdAt: s.created_at,
      items: (s.sales_invoice_lines || []).map((i) => ({
        id: i.id,
        productId: i.product_id,
        qty: Number(i.qty || 0),
        salePrice: Number(i.sale_price || 0),
        costPrice: Number(i.cost_price || 0),
        total: Number(i.line_total || 0),
        name: products.find((p) => p.id === i.product_id)?.name || 'صنف',
      })),
    })),
    purchases: (payload.purchases || []).map((p) => ({
      id: p.id,
      invoiceNo: p.invoice_no,
      supplierId: p.supplier_id,
      subtotal: Number(p.subtotal || 0),
      extraExpenses: Number(p.extra_expenses || 0),
      discount: Number(p.discount_amount || 0),
      grandTotal: Number(p.grand_total || 0),
      paid: Number(p.paid_amount || 0),
      remaining: Number(p.remaining_amount || 0),
      createdAt: p.created_at,
      items: (p.purchase_invoice_lines || []).map((i) => ({
        id: i.id,
        productId: i.product_id,
        qty: Number(i.qty || 0),
        unitCost: Number(i.unit_cost || 0),
        total: Number(i.line_total || 0),
        name: products.find((prd) => prd.id === i.product_id)?.name || 'صنف',
      })),
    })),
    stockMovements: (payload.stockMovements || []).map((m) => ({ id: m.id, productId: m.product_id, qtyDelta: Number(m.qty_delta || 0), reason: m.reason, referenceType: m.reference_type, referenceId: m.reference_id, at: m.created_at, actor: m.actor_id || 'user' })),
    auditLogs: (payload.auditLogs || []).map((a) => ({ id: a.id, action: a.action, details: typeof a.details === 'string' ? a.details : JSON.stringify(a.details || {}), at: a.created_at, actor: a.actor_id || 'user' })),
    license: payload.license ? { id: payload.license.id, status: payload.license.status, startedAt: payload.license.started_at, endsAt: payload.license.ends_at, activityKey: payload.license.activity_key, plan: payload.license.plan_code } : null,
    team: (payload.team || []).map((member) => ({
      id: member.id,
      roleCode: member.role_code,
      username: member.username,
      displayName: member.display_name,
      permissions: member.permissions || {},
      isActive: member.is_active,
      branches: branchAccess.filter((a) => a.profile_id === member.id).map((a) => a.branch_id),
    })),
  };
}

function normalizeAdmin(payload) {
  return {
    admin: payload.admin,
    stats: payload.stats,
    tenants: payload.tenants || [],
    logs: payload.logs || [],
  };
}

async function fetchAdminStatus() {
  try {
    const result = await callEdge('admin-status');
    state.adminExists = result.exists;
    state.adminLoginMode = result.exists ? 'login' : 'bootstrap';
  } catch {
    state.adminExists = false;
    state.adminLoginMode = 'bootstrap';
  }
}

async function bootstrapShopSession() {
  const auth = authState();
  if (!auth?.access_token) throw new Error('no_auth');
  const result = await callEdge('bootstrap-session', {}, true);
  state.session = normalizeSession(result.session);
  state.adminData = null;
  state.screen = 'app';
}

async function bootstrapAdminSession() {
  const auth = authState();
  if (!auth?.access_token) throw new Error('no_auth');
  const result = await callEdge('admin-dashboard', {}, true);
  state.adminData = normalizeAdmin(result);
  state.session = null;
  state.screen = 'admin';
}

async function initializeSession() {
  await fetchAdminStatus();
  const auth = authState();
  if (!auth?.access_token) {
    state.screen = 'welcome';
    return;
  }
  try {
    await bootstrapShopSession();
    const license = await callEdge('verify-license', { tenantId: currentTenant().id });
    if (!license.active) {
      await authLogout();
      state.screen = 'welcome';
      throw new Error('الترخيص غير نشط حاليًا.');
    }
    return;
  } catch {}
  try {
    await bootstrapAdminSession();
    return;
  } catch {}
  await authLogout();
  state.screen = 'welcome';
}

async function registerTenant(form) {
  await callEdge('register-tenant', {
    shopName: form.shopName,
    ownerName: form.ownerName,
    activityKey: form.activityKey,
    country: form.country,
    currency: form.currency,
    phone: form.phone,
    address: form.address,
    taxNo: form.taxNo,
    branchName: form.branchName,
    username: form.username,
    email: form.email,
    password: form.password,
    planCode: 'basic',
  });
  await authLogin(form.email, form.password);
  await bootstrapShopSession();
  setNotice('تم إنشاء المحل وربطه بالنشاط والترخيص بنجاح.');
}

async function loginTenant(email, password) {
  await authLogin(email, password);
  await bootstrapShopSession();
  const license = await callEdge('verify-license', { tenantId: currentTenant().id });
  if (!license.active) {
    await authLogout();
    throw new Error('الترخيص غير نشط حاليًا.');
  }
  setNotice('تم تسجيل الدخول إلى نظام المحل.');
}

async function bootstrapAdmin(form) {
  await callEdge('admin-bootstrap', { email: form.email, password: form.password, displayName: form.displayName || 'Platform Admin' });
  await fetchAdminStatus();
  await authLogin(form.email, form.password);
  await bootstrapAdminSession();
  setNotice('تم إنشاء أول مدير للمنصة وفتح لوحة الإدارة المركزية.');
}

async function loginAdmin(email, password) {
  await authLogin(email, password);
  await bootstrapAdminSession();
  setNotice('تم تسجيل الدخول إلى لوحة الإدارة المركزية.');
}

async function logoutAll() {
  setNotice('تم تسجيل الخروج بأمان.');
  await authLogout();
  state.session = null;
  state.adminData = null;
  state.screen = 'welcome';
  state.cart = [];
  await fetchAdminStatus();
}

function buildPermissionMap(formData, roleCode) {
  const template = { ...(ROLE_TEMPLATES[roleCode] || ROLE_TEMPLATES.employee) };
  for (const permission of PERMISSIONS) {
    template[permission.key] = formData.get(permission.key) === 'on';
  }
  return template;
}

function activityPayloadFromForm(activity, form) {
  const data = {};
  activity.specializedFields.forEach(([key]) => { data[key] = form[key] || ''; });
  return data;
}

async function createProduct(form) {
  const activity = currentActivityConfig();
  const tenant = currentTenant();
  const created = await restInsert('products', {
    tenant_id: tenant.id,
    branch_id: state.session.branchId,
    activity_key: tenant.activityKey,
    name: form.name,
    sku: form.code || uid('sku'),
    barcode: form.barcode || null,
    purchase_price: Number(form.purchasePrice || 0),
    sale_price: Number(form.salePrice || 0),
    stock_qty: Number(form.stockQty || 0),
    reserved_qty: 0,
    min_stock: Number(form.minStock || 0),
    activity_data: activityPayloadFromForm(activity, form),
  });
  if (Number(form.stockQty || 0) > 0) {
    await restInsert('stock_movements', {
      tenant_id: tenant.id,
      branch_id: state.session.branchId,
      product_id: created[0].id,
      qty_delta: Number(form.stockQty || 0),
      reason: 'opening_balance',
      reference_type: 'opening',
      reference_id: created[0].id,
      actor_id: state.session.user.id,
    });
  }
  await restInsert('audit_logs', {
    tenant_id: tenant.id,
    branch_id: state.session.branchId,
    actor_id: state.session.user.id,
    action: 'create_product',
    details: { product_id: created[0].id },
  });
  await bootstrapShopSession();
  setNotice('تم حفظ الصنف على الخادم.');
}

async function ensureSupplier(name, phone) {
  const existing = state.session.suppliers.find((s) => s.name === name.trim());
  if (existing) return existing;
  const created = await restInsert('suppliers', { tenant_id: currentTenant().id, name: name.trim(), phone: phone || null, address: null });
  return { id: created[0].id, name: created[0].name, phone: created[0].phone, address: created[0].address };
}

async function recordPurchase(form) {
  const tenantId = currentTenant().id;
  const product = state.session.products.find((p) => p.id === form.productId);
  if (!product) throw new Error('اختر صنفًا صالحًا.');
  const supplier = await ensureSupplier(form.supplierName, form.supplierPhone);
  const qty = Number(form.qty || 0);
  const unitCost = Number(form.unitCost || product.purchasePrice || 0);
  const discount = Number(form.discount || 0);
  const extra = Number(form.extraExpenses || 0);
  const subtotal = qty * unitCost;
  const grandTotal = subtotal + extra - discount;
  const paid = Number(form.paid || 0);
  const purchase = await restInsert('purchase_invoices', {
    tenant_id: tenantId,
    branch_id: state.session.branchId,
    invoice_no: `PUR-${Date.now()}`,
    supplier_id: supplier.id,
    subtotal,
    extra_expenses: extra,
    discount_amount: discount,
    grand_total: grandTotal,
    paid_amount: paid,
    remaining_amount: grandTotal - paid,
    created_by: state.session.user.id,
  });
  await restInsert('purchase_invoice_lines', {
    tenant_id: tenantId,
    invoice_id: purchase[0].id,
    product_id: product.id,
    qty,
    unit_cost: unitCost,
    line_total: subtotal,
  });
  await restUpdate('products', { stock_qty: product.stockQty + qty, purchase_price: unitCost }, { id: `eq.${product.id}` });
  await restInsert('stock_movements', {
    tenant_id: tenantId,
    branch_id: state.session.branchId,
    product_id: product.id,
    qty_delta: qty,
    reason: 'purchase',
    reference_type: 'purchase',
    reference_id: purchase[0].id,
    actor_id: state.session.user.id,
  });
  await restInsert('audit_logs', {
    tenant_id: tenantId,
    branch_id: state.session.branchId,
    actor_id: state.session.user.id,
    action: 'create_purchase',
    details: { purchase_id: purchase[0].id },
  });
  await bootstrapShopSession();
  setNotice('تم تسجيل فاتورة الشراء وتحديث المخزون.');
}

function addToCart(productId) {
  const product = state.session.products.find((p) => p.id === productId);
  if (!product) return;
  const found = state.cart.find((i) => i.productId === productId);
  if (found) {
    if (found.qty + 1 > product.stockQty) return setErrorNotice('لا يمكن تجاوز الكمية المتاحة.');
    found.qty += 1;
  } else {
    if (product.stockQty < 1) return setErrorNotice('المخزون غير متاح.');
    state.cart.push({ productId, name: product.name, qty: 1, salePrice: product.salePrice, costPrice: product.purchasePrice });
  }
  render();
}

function updateCartQty(productId, qty) {
  const product = state.session.products.find((p) => p.id === productId);
  const item = state.cart.find((i) => i.productId === productId);
  const nextQty = Number(qty);
  if (!item || !product) return;
  if (nextQty < 1) state.cart = state.cart.filter((i) => i.productId !== productId);
  else if (nextQty > product.stockQty) setErrorNotice('الكمية تتجاوز المخزون المتاح.');
  else item.qty = nextQty;
  render();
}

function cartTotals() {
  const subtotal = state.cart.reduce((sum, item) => sum + Number(item.salePrice) * Number(item.qty), 0);
  return { subtotal, grandTotal: subtotal };
}

async function checkoutSale(form) {
  if (!state.cart.length) throw new Error('أضف منتجًا واحدًا على الأقل.');
  const payload = {
    tenantId: currentTenant().id,
    branchId: state.session.branchId,
    idempotencyKey: form.idempotencyKey || uid('idem'),
    invoiceNo: `INV-${Date.now()}`,
    paymentMethod: form.paymentMethod,
    paidAmount: Number(form.paid || 0),
    actorId: state.session.user.id,
    items: state.cart.map((item) => ({ product_id: item.productId, qty: item.qty, sale_price: item.salePrice })),
  };
  const result = await callEdge('process-sale', payload, true);
  const cartSnapshot = state.cart.map((i) => ({ ...i }));
  await bootstrapShopSession();
  const totals = cartTotals();
  const sale = state.session.sales.find((s) => s.id === result.invoiceId) || { invoiceNo: payload.invoiceNo, grandTotal: totals.grandTotal, paid: payload.paidAmount, remaining: Math.max(totals.grandTotal - payload.paidAmount, 0), createdAt: now(), items: cartSnapshot };
  state.cart = [];
  printInvoice(sale, state.invoicePrintSize);
  setNotice('تمت عملية البيع وتحديث المخزون والطباعة.');
}

async function createBranch(form) {
  await callEdge('create-branch', form, true);
  await bootstrapShopSession();
  setNotice('تم إنشاء الفرع الجديد وربطه بالمحل.');
}

async function createStaffUser(formData) {
  const branchIds = formData.getAll('branchIds');
  if (!branchIds.length) throw new Error('اختر فرعًا واحدًا على الأقل.');
  const roleCode = formData.get('roleCode');
  await callEdge('create-staff-user', {
    email: formData.get('email'),
    password: formData.get('password'),
    username: formData.get('username'),
    displayName: formData.get('displayName'),
    roleCode,
    branchIds,
    permissions: buildPermissionMap(formData, roleCode),
  }, true);
  await bootstrapShopSession();
  setNotice('تم إنشاء المستخدم وربطه بالصلاحيات والفروع المحددة.');
}

async function updateLicense(tenantId, status) {
  await callEdge('admin-update-license', { tenantId, status }, true);
  await bootstrapAdminSession();
  setNotice('تم تحديث حالة الترخيص من لوحة الإدارة المركزية.');
}

function computeKpis() {
  const sales = state.session.sales.reduce((s, x) => s + x.grandTotal, 0);
  const purchases = state.session.purchases.reduce((s, x) => s + x.grandTotal, 0);
  const stock = state.session.products.reduce((s, p) => s + p.stockQty, 0);
  const due = state.session.sales.reduce((s, x) => s + (x.remaining || 0), 0) + state.session.purchases.reduce((s, x) => s + (x.remaining || 0), 0);
  return { sales, purchases, stock, due };
}

function calculateReports() {
  const revenue = state.session.sales.reduce((s, inv) => s + inv.grandTotal, 0);
  const cogs = state.session.sales.reduce((sum, inv) => sum + inv.items.reduce((a, item) => a + Number(item.costPrice || 0) * Number(item.qty || 0), 0), 0);
  const expenses = 0;
  const profit = revenue - cogs - expenses;
  const stagnant = state.session.products.filter((p) => !state.session.sales.some((s) => s.items.some((i) => i.productId === p.id))).length;
  return { revenue, cogs, expenses, profit, stagnant };
}

function permissionSummary(map) {
  return PERMISSIONS.filter((p) => map?.[p.key]).map((p) => p.label).join('، ') || 'بدون صلاحيات إضافية';
}

function printInvoice(sale, size = '80') {
  const tenant = currentTenant();
  const w = window.open('', '_blank', 'width=900,height=700');
  const rows = (sale.items || []).map((item) => `<tr><td>${item.name || 'صنف'}</td><td>${item.qty}</td><td>${money(item.salePrice)}</td><td>${money(item.total || item.salePrice * item.qty)}</td></tr>`).join('');
  w.document.write(`<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${sale.invoiceNo}</title><style>body{font-family:Tahoma,Arial,sans-serif;padding:${size==='58' ? '8px':'16px'};width:${size==='58'?'58mm':size==='80'?'80mm':'210mm'};margin:auto}table{width:100%;border-collapse:collapse}td,th{padding:6px 0;border-bottom:1px dashed #cbd5e1;text-align:right}h1,h2,p{margin:0 0 8px}</style></head><body><div class="print-sheet"><div class="invoice-head"><h1>${tenant.shopName}</h1><p>${tenant.address || ''}</p><p>${tenant.phone || ''}</p><h2>فاتورة ${sale.invoiceNo}</h2><p>${formatDate(sale.createdAt)}</p></div><table><thead><tr><th>الصنف</th><th>الكمية</th><th>السعر</th><th>الإجمالي</th></tr></thead><tbody>${rows}</tbody></table><p><strong>الإجمالي:</strong> ${money(sale.grandTotal)}</p><p><strong>المدفوع:</strong> ${money(sale.paid)}</p><p><strong>المتبقي:</strong> ${money(sale.remaining)}</p></div><script>window.onload=()=>window.print()</script></body></html>`);
  w.document.close();
}

function renderStatusCenter(compact = false) {
  const items = state.statusFeed.length
    ? state.statusFeed.map((item) => `<div class="status-item ${item.kind}"><strong>${item.kind === 'error' ? 'خطأ' : 'نجاح'}</strong><span>${item.text}</span><small>${formatDate(item.at)}</small></div>`).join('')
    : `<div class="status-item info"><strong>جاهز</strong><span>يمكنك البدء في التسجيل أو الإدارة أو تشغيل عمليات المتجر.</span><small>سجل العمليات سيظهر هنا.</small></div>`;
  return `<section class="card status-center ${compact ? 'compact' : ''}" style="margin-bottom:16px"><div class="status-head"><div><h3>سجل التنفيذ</h3><p>آخر عمليات النجاح والفشل تظهر هنا بدل الرسائل العامة.</p></div><div class="badges"><span class="badge">الإصدار: ${state.releaseTag}</span>${state.syncing ? '<span class="badge sync-pill">جارٍ التنفيذ</span>' : ''}</div></div>${state.notice ? `<div class="status-banner">${state.notice}</div>` : ''}<div class="status-list">${items}</div></section>`;
}
function noticeBlock() {
  return renderStatusCenter(true);
}

function renderLoading() {
  app.innerHTML = `<div class="hero"><div class="panel"><h1 class="title">جاري تجهيز Najah Retail…</h1><p class="subtitle">${state.syncing ? 'يتم تنفيذ العملية على Supabase الحقيقي.' : 'جاري التحقق من الجلسة والربط.'}</p></div></div>`;
}

function renderRegisterForm(selected) {
  return h`<form id="register-form" class="grid"><div class="field"><label>النشاط التجاري</label><select name="activityKey">${ACTIVITY_CATALOG.map((a) => `<option value="${a.key}" ${a.key===state.registrationActivity?'selected':''}>${a.label}</option>`).join('')}</select></div><div class="empty">النشاط المحدد الآن: <strong>${selected.label}</strong> — ستظهر فقط وظائف هذا النشاط بعد الدخول.</div><div class="form-grid"><div class="field"><label>اسم المحل</label><input required name="shopName" /></div><div class="field"><label>اسم المالك</label><input required name="ownerName" /></div><div class="field"><label>الدولة</label><input required name="country" /></div><div class="field"><label>العملة</label><input required name="currency" value="USD" /></div><div class="field"><label>رقم الهاتف</label><input required name="phone" /></div><div class="field"><label>العنوان</label><input required name="address" /></div><div class="field"><label>الرقم الضريبي</label><input name="taxNo" /></div><div class="field"><label>البريد الإلكتروني</label><input required type="email" name="email" /></div><div class="field"><label>اسم المستخدم</label><input required name="username" /></div><div class="field"><label>كلمة المرور</label><input required type="password" name="password" /></div><div class="field"><label>اسم الفرع الأول</label><input required name="branchName" value="الفرع الرئيسي" /></div></div><div class="actions"><button class="btn" type="submit">إنشاء المحل والدخول</button></div></form>`;
}

function renderLoginForm() {
  return h`<form id="login-form" class="grid"><div class="field"><label>البريد الإلكتروني</label><input required type="email" name="email" /></div><div class="field"><label>كلمة المرور</label><input required type="password" name="password" /></div><div class="actions"><button class="btn" type="submit">تسجيل الدخول</button></div></form>`;
}

function renderAdminForm() {
  if (state.adminLoginMode === 'bootstrap') {
    return h`<form id="admin-bootstrap-form" class="grid"><div class="empty">لا يوجد مدير منصة بعد. أنشئ أول حساب لإدارة المنصة المركزية.</div><div class="field"><label>اسم المدير</label><input required name="displayName" value="Platform Admin" /></div><div class="field"><label>البريد الإلكتروني</label><input required type="email" name="email" /></div><div class="field"><label>كلمة المرور</label><input required type="password" name="password" /></div><div class="actions"><button class="btn" type="submit">إنشاء أول مدير منصة</button></div></form>`;
  }
  return h`<form id="admin-login-form" class="grid"><div class="empty">هذه اللوحة خاصة بإدارة المنصة والتراخيص والعملاء فقط.</div><div class="field"><label>البريد الإلكتروني</label><input required type="email" name="email" /></div><div class="field"><label>كلمة المرور</label><input required type="password" name="password" /></div><div class="actions"><button class="btn" type="submit">دخول لوحة الإدارة المركزية</button></div></form>`;
}

function renderWelcome() {
  const selected = ACTIVITY_CATALOG.find((a) => a.key === state.registrationActivity);
  app.innerHTML = h`<div class="hero"><div class="hero-grid"><section class="panel"><div class="tag">نجاح | Najah Retail</div><h1 class="title">نظام واحد لإدارة محلك — بواجهة مخصصة حسب نشاطك فقط</h1><p class="subtitle">هذه النسخة مربوطة بـ Supabase الحقيقي، وتتضمن تسجيل محلات، لوحة إدارة مركزية، وفروع وصلاحيات متعددة لكل محل.</p><ul class="feature-list"><li><strong>RLS حقيقي:</strong> كل محل tenant معزول.</li><li><strong>لوحة إدارة مركزية:</strong> لإدارة التراخيص والعملاء من مكان واحد.</li><li><strong>فروع وصلاحيات:</strong> ربط المستخدمين بفروع متعددة مع صلاحيات تفصيلية.</li><li><strong>سجل تنفيذ ظاهر:</strong> نتائج النجاح والفشل تظهر داخل الواجهة مباشرة.</li></ul></section><section class="panel"><div class="login-tabs"><button class="btn ${state.authTab === 'register' ? '' : 'secondary'}" data-tab="register">تسجيل محل جديد</button><button class="btn ${state.authTab === 'login' ? '' : 'secondary'}" data-tab="login">تسجيل دخول المحل</button><button class="btn ${state.authTab === 'admin' ? '' : 'secondary'}" data-tab="admin">لوحة الإدارة</button></div>${state.authTab === 'register' ? renderRegisterForm(selected) : state.authTab === 'login' ? renderLoginForm() : renderAdminForm()}${renderStatusCenter()}</section></div></div>`;
  bindWelcomeEvents();
}

function renderSidebar() {
  const activity = currentActivityConfig();
  const labels = { dashboard: 'لوحة التحكم', products: 'المنتجات', sales: 'المبيعات / POS', purchases: 'المشتريات', inventory: 'المخزون', reports: 'التقارير', settings: 'الإعدادات والفروع والصلاحيات', services: 'الخدمات / الصيانة' };
  return h`<aside class="sidebar"><div class="brand"><div class="brand-mark">ن</div><div><h1>Najah Retail</h1><p>${currentTenant().shopName}</p></div></div><div class="nav-label">النشاط الحالي</div><div class="badge" style="background:rgba(255,255,255,.12);color:#fff;border:none">${activity.icon} ${activity.label}</div><div class="nav-group"><div class="nav-label">القائمة</div>${activity.sidebar.map((item) => `<button class="nav-btn ${state.section===item?'active':''}" data-section="${item}"><span>${labels[item]}</span><span>‹</span></button>`).join('')}</div><div class="nav-group"><div class="nav-label">الحساب</div><button class="nav-btn" id="logout-btn"><span>تسجيل الخروج</span><span>×</span></button></div></aside>`;
}

function renderDashboard() {
  const k = computeKpis();
  const r = calculateReports();
  const lowStock = state.session.products.filter((p) => p.stockQty <= p.minStock).length;
  return h`<div class="grid four"><div class="card kpi"><h3>إجمالي المبيعات</h3><strong>${money(k.sales)}</strong></div><div class="card kpi"><h3>إجمالي المشتريات</h3><strong>${money(k.purchases)}</strong></div><div class="card kpi"><h3>الربح المحقق</h3><strong>${money(r.profit)}</strong></div><div class="card kpi"><h3>المنتجات منخفضة المخزون</h3><strong>${lowStock}</strong></div></div><div class="grid two" style="margin-top:18px"><section class="card"><h3>ملخص الربط</h3><div class="badges"><span class="badge">المشروع: ${CONFIG.projectRef}</span><span class="badge">الترخيص: ${state.session.license?.status || currentTenant().licenseStatus}</span><span class="badge">الفروع: ${state.session.branches.length}</span><span class="badge">المستخدمون: ${state.session.team.length}</span></div></section><section class="card"><h3>الوضع الحالي</h3><div class="empty">ابدأ من تسجيل المنتجات ثم المشتريات ثم المبيعات. إعدادات الفروع والمستخدمين متاحة بالتفصيل داخل قسم الإعدادات.<div class="stat-line">حالة الإصدار: <strong>جاهز للاختبار النهائي</strong> — Functions Base: ${CONFIG.functionsBase}</div></div></section></div>`;
}

function renderProducts() {
  const activity = currentActivityConfig();
  return h`<div class="grid two"><section class="card"><h3>إضافة صنف جديد</h3><form id="product-form" class="grid"><div class="form-grid"><div class="field"><label>اسم الصنف</label><input required name="name" /></div><div class="field"><label>كود الصنف</label><input name="code" /></div><div class="field"><label>الباركود</label><input name="barcode" /></div><div class="field"><label>تكلفة الشراء</label><input name="purchasePrice" type="number" min="0" step="0.01" /></div><div class="field"><label>سعر البيع</label><input name="salePrice" type="number" min="0" step="0.01" /></div><div class="field"><label>الكمية الافتتاحية</label><input name="stockQty" type="number" min="0" step="1" /></div><div class="field"><label>الحد الأدنى للمخزون</label><input name="minStock" type="number" min="0" step="1" /></div>${activity.specializedFields.map(([key, label]) => `<div class="field"><label>${label}</label><input name="${key}" /></div>`).join('')}</div><div class="actions"><button class="btn" type="submit">حفظ الصنف</button></div></form></section><section class="card"><h3>قائمة المنتجات</h3>${state.session.products.length ? `<div class="table-wrap"><table class="table"><thead><tr><th>الاسم</th><th>الكود</th><th>المخزون</th><th>سعر البيع</th><th>تنبيه</th></tr></thead><tbody>${state.session.products.map((p) => `<tr><td>${p.name}</td><td>${p.code}</td><td>${p.stockQty}</td><td>${money(p.salePrice)}</td><td>${p.stockQty <= p.minStock ? 'منخفض' : 'جيد'}</td></tr>`).join('')}</tbody></table></div>` : '<div class="empty">لا توجد منتجات بعد.</div>'}</section></div>`;
}

function renderSales() {
  const filtered = state.session.products.filter((p) => p.name.includes(state.posSearch) || p.code.includes(state.posSearch) || (p.barcode || '').includes(state.posSearch));
  const totals = cartTotals();
  return h`<div class="split"><section class="card"><h3>نقطة البيع</h3><div class="form-grid"><div class="field"><label>بحث</label><input id="pos-search" value="${state.posSearch}" placeholder="اسم أو كود أو باركود" /></div><div class="field"><label>مقاس الفاتورة</label><select id="print-size"><option value="58" ${state.invoicePrintSize==='58'?'selected':''}>58mm</option><option value="80" ${state.invoicePrintSize==='80'?'selected':''}>80mm</option><option value="A4" ${state.invoicePrintSize==='A4'?'selected':''}>A4</option></select></div></div>${filtered.length ? `<div class="table-wrap" style="margin-top:12px"><table class="table"><thead><tr><th>الصنف</th><th>المتوفر</th><th>السعر</th><th></th></tr></thead><tbody>${filtered.map((p) => `<tr><td>${p.name}</td><td>${p.stockQty}</td><td>${money(p.salePrice)}</td><td><button class="btn secondary add-cart" data-product="${p.id}">إضافة</button></td></tr>`).join('')}</tbody></table></div>` : '<div class="empty">لا توجد نتائج.</div>'}</section><section class="card"><h3>سلة البيع</h3><form id="checkout-form">${state.cart.length ? state.cart.map((item) => `<div class="cart-item"><strong>${item.name}</strong><input type="number" min="1" value="${item.qty}" data-qty="${item.productId}" /><span>${money(item.salePrice)}</span><button type="button" class="btn ghost remove-item" data-remove="${item.productId}">حذف</button></div>`).join('') : '<div class="empty">السلة فارغة.</div>'}<div class="totals"><div class="total-row"><span>الإجمالي</span><strong>${money(totals.grandTotal)}</strong></div></div><div class="form-grid" style="margin-top:12px"><div class="field"><label>طريقة الدفع</label><select name="paymentMethod">${PAYMENT_METHODS.map((p) => `<option value="${p.value}">${p.label}</option>`).join('')}</select></div><div class="field"><label>المدفوع</label><input type="number" min="0" step="0.01" name="paid" value="${totals.grandTotal || 0}" /></div><div class="field"><label>مفتاح منع التكرار</label><input name="idempotencyKey" value="${uid('idem')}" /></div></div><div class="actions"><button class="btn success" type="submit">إتمام البيع والطباعة</button></div></form></section></div><section class="card" style="margin-top:18px"><h3>سجل المبيعات</h3>${state.session.sales.length ? `<div class="table-wrap"><table class="table"><thead><tr><th>الفاتورة</th><th>التاريخ</th><th>الدفع</th><th>الإجمالي</th><th>المتبقي</th></tr></thead><tbody>${state.session.sales.map((s) => `<tr><td>${s.invoiceNo}</td><td>${formatDate(s.createdAt)}</td><td>${PAYMENT_METHODS.find((m) => m.value === s.paymentMethod)?.label || s.paymentMethod}</td><td>${money(s.grandTotal)}</td><td>${money(s.remaining)}</td></tr>`).join('')}</tbody></table></div>` : '<div class="empty">لا توجد عمليات بيع بعد.</div>'}</section>`;
}

function renderPurchases() {
  return h`<div class="grid two"><section class="card"><h3>فاتورة شراء</h3><form id="purchase-form" class="grid"><div class="form-grid"><div class="field"><label>اسم المورد</label><input required name="supplierName" /></div><div class="field"><label>هاتف المورد</label><input name="supplierPhone" /></div><div class="field"><label>الصنف</label><select name="productId" required><option value="">اختر</option>${state.session.products.map((p) => `<option value="${p.id}">${p.name}</option>`).join('')}</select></div><div class="field"><label>الكمية</label><input required type="number" min="1" step="1" name="qty" /></div><div class="field"><label>تكلفة الوحدة</label><input required type="number" min="0" step="0.01" name="unitCost" /></div><div class="field"><label>خصم</label><input type="number" min="0" step="0.01" name="discount" value="0" /></div><div class="field"><label>مصاريف إضافية</label><input type="number" min="0" step="0.01" name="extraExpenses" value="0" /></div><div class="field"><label>المدفوع</label><input type="number" min="0" step="0.01" name="paid" value="0" /></div></div><div class="actions"><button class="btn" type="submit">حفظ فاتورة الشراء</button></div></form></section><section class="card"><h3>الموردون</h3>${state.session.suppliers.length ? `<div class="table-wrap"><table class="table"><thead><tr><th>الاسم</th><th>الهاتف</th></tr></thead><tbody>${state.session.suppliers.map((s) => `<tr><td>${s.name}</td><td>${s.phone || '-'}</td></tr>`).join('')}</tbody></table></div>` : '<div class="empty">لا يوجد موردون بعد.</div>'}</section></div><section class="card" style="margin-top:18px"><h3>سجل المشتريات</h3>${state.session.purchases.length ? `<div class="table-wrap"><table class="table"><thead><tr><th>الفاتورة</th><th>التاريخ</th><th>الإجمالي</th><th>المتبقي</th></tr></thead><tbody>${state.session.purchases.map((p) => `<tr><td>${p.invoiceNo}</td><td>${formatDate(p.createdAt)}</td><td>${money(p.grandTotal)}</td><td>${money(p.remaining)}</td></tr>`).join('')}</tbody></table></div>` : '<div class="empty">لا توجد مشتريات بعد.</div>'}</section>`;
}

function renderInventory() {
  return h`<div class="grid two"><section class="card"><h3>الرصيد الحالي</h3>${state.session.products.length ? `<div class="table-wrap"><table class="table"><thead><tr><th>الصنف</th><th>الكمية</th><th>الحد الأدنى</th><th>الحالة</th></tr></thead><tbody>${state.session.products.map((p) => `<tr><td>${p.name}</td><td>${p.stockQty}</td><td>${p.minStock}</td><td>${p.stockQty <= p.minStock ? 'تنبيه نقص' : 'طبيعي'}</td></tr>`).join('')}</tbody></table></div>` : '<div class="empty">لا يوجد مخزون بعد.</div>'}</section><section class="card"><h3>حركة المخزون</h3>${state.session.stockMovements.length ? `<div class="audit-list">${state.session.stockMovements.slice(0,20).map((m) => { const product = state.session.products.find((p) => p.id === m.productId); return `<div class="audit-item"><strong>${product?.name || 'صنف'}</strong><div class="stat-line">${m.qtyDelta > 0 ? '+' : ''}${m.qtyDelta} — ${m.reason} — ${formatDate(m.at)}</div></div>`; }).join('')}</div>` : '<div class="empty">لا توجد حركة مخزون بعد.</div>'}</section></div>`;
}

function renderReports() {
  const r = calculateReports();
  return h`<div class="grid four"><div class="card kpi"><h3>الإيراد</h3><strong>${money(r.revenue)}</strong></div><div class="card kpi"><h3>تكلفة البضاعة المباعة</h3><strong>${money(r.cogs)}</strong></div><div class="card kpi"><h3>المصروفات</h3><strong>${money(r.expenses)}</strong></div><div class="card kpi"><h3>الربح الصافي</h3><strong>${money(r.profit)}</strong></div></div><section class="card" style="margin-top:18px"><h3>ملخص تحليلي</h3><div class="table-wrap"><table class="table"><tbody><tr><th>المنتجات الراكدة</th><td>${r.stagnant}</td></tr><tr><th>إجمالي المبيعات</th><td>${money(computeKpis().sales)}</td></tr><tr><th>إجمالي المشتريات</th><td>${money(computeKpis().purchases)}</td></tr><tr><th>المبالغ المستحقة</th><td>${money(computeKpis().due)}</td></tr></tbody></table></div></section>`;
}

function renderSettings() {
  const branchCards = state.session.branches.map((branch) => `<div class="audit-item"><strong>${branch.name}</strong><div class="stat-line">${branch.phone || '-'} — ${branch.address || '-'}</div></div>`).join('') || '<div class="empty">لا توجد فروع بعد.</div>';
  const teamRows = state.session.team.map((member) => `<tr><td>${member.displayName || member.username}</td><td>${member.roleCode}</td><td>${member.branches.map((branchId) => state.session.branches.find((b) => b.id === branchId)?.name || branchId).join('، ')}</td><td>${permissionSummary(member.permissions)}</td></tr>`).join('') || '<tr><td colspan="4">لا يوجد مستخدمون إضافيون بعد.</td></tr>';
  return h`<div class="grid two"><section class="card"><h3>إعدادات المحل</h3><div class="table-wrap"><table class="table"><tbody><tr><th>اسم المحل</th><td>${currentTenant().shopName}</td></tr><tr><th>المالك</th><td>${currentTenant().ownerName}</td></tr><tr><th>الهاتف</th><td>${currentTenant().phone}</td></tr><tr><th>العنوان</th><td>${currentTenant().address}</td></tr><tr><th>العملة</th><td>${currentTenant().currency}</td></tr><tr><th>البريد</th><td>${state.session.user.email}</td></tr></tbody></table></div><div class="stat-line" style="margin-top:12px">الدور الحالي: <strong>${state.session.user.role}</strong> — الفرع الحالي: <strong>${activeBranchName()}</strong></div></section><section class="card"><h3>سجل التدقيق</h3>${state.session.auditLogs.length ? `<div class="audit-list">${state.session.auditLogs.slice(0,12).map((a) => `<div class="audit-item"><strong>${a.action}</strong><div class="stat-line">${a.details} — ${formatDate(a.at)}</div></div>`).join('')}</div>` : '<div class="empty">لا توجد عمليات تدقيق بعد.</div>'}</section></div><div class="grid two" style="margin-top:18px"><section class="card"><h3>الفروع</h3>${branchCards}${can('manage_branches') ? `<form id="branch-form" class="grid" style="margin-top:16px"><div class="form-grid"><div class="field"><label>اسم الفرع</label><input required name="name" /></div><div class="field"><label>الهاتف</label><input name="phone" /></div><div class="field"><label>العنوان</label><input name="address" /></div></div><div class="actions"><button class="btn" type="submit">إضافة فرع جديد</button></div></form>` : '<div class="empty">ليس لديك صلاحية إدارة الفروع.</div>'}</section><section class="card"><h3>المستخدمون والصلاحيات</h3><div class="table-wrap"><table class="table"><thead><tr><th>المستخدم</th><th>الدور</th><th>الفروع</th><th>الصلاحيات</th></tr></thead><tbody>${teamRows}</tbody></table></div>${can('manage_users') ? `<form id="staff-form" class="grid" style="margin-top:16px"><div class="form-grid"><div class="field"><label>الاسم</label><input required name="displayName" /></div><div class="field"><label>اسم المستخدم</label><input required name="username" /></div><div class="field"><label>البريد الإلكتروني</label><input required type="email" name="email" /></div><div class="field"><label>كلمة المرور</label><input required type="password" name="password" /></div><div class="field"><label>الدور</label><select name="roleCode">${Object.keys(ROLE_TEMPLATES).map((role) => `<option value="${role}">${role}</option>`).join('')}</select></div></div><div class="field"><label>الفروع المسموح بها</label><div class="audit-list">${state.session.branches.map((branch) => `<label class="audit-item"><input type="checkbox" name="branchIds" value="${branch.id}" checked /> ${branch.name}</label>`).join('')}</div></div><div class="field"><label>الصلاحيات التفصيلية</label><div class="audit-list">${PERMISSIONS.map((permission) => `<label class="audit-item"><input type="checkbox" name="${permission.key}" ${ROLE_TEMPLATES.manager[permission.key] ? 'checked' : ''} /> ${permission.label}</label>`).join('')}</div></div><div class="actions"><button class="btn" type="submit">إضافة مستخدم جديد</button></div></form>` : '<div class="empty">ليس لديك صلاحية إدارة المستخدمين.</div>'}</section></div>`;
}

function renderServices() {
  return `<section class="card"><h3>الخدمات / الصيانة</h3><div class="empty">هذا القسم جاهز للنشاطات التي تحتاج صيانة وضمان. يمكن توسيعه لاحقًا بأوامر صيانة وسجل أجهزة.</div></section>`;
}

function renderApp() {
  const activity = currentActivityConfig();
  const sectionTitles = { dashboard: 'لوحة التحكم', products: 'المنتجات', sales: 'المبيعات ونقطة البيع', purchases: 'المشتريات والموردون', inventory: 'إدارة المخزون', reports: 'التقارير', settings: 'الفروع والمستخدمون والصلاحيات', services: 'الخدمات / الصيانة' };
  const sections = { dashboard: renderDashboard, products: renderProducts, sales: renderSales, purchases: renderPurchases, inventory: renderInventory, reports: renderReports, settings: renderSettings, services: renderServices };
  app.innerHTML = h`<div class="app-shell">${renderSidebar()}<main class="main">${noticeBlock()}<div class="topbar"><div><h2>${sectionTitles[state.section]}</h2><p>${activity.label} — ${currentTenant().shopName}</p></div><div class="badges"><span class="badge">Supabase: ${CONFIG.projectRef}</span><span class="badge">الفرع: ${activeBranchName()}</span><span class="badge">الإصدار: ${state.releaseTag}</span></div></div>${sections[state.section]()}</main></div>`;
  bindAppEvents();
}

function renderAdmin() {
  const tenants = state.adminData.tenants || [];
  const logs = state.adminData.logs || [];
  app.innerHTML = h`<div class="hero"><div class="topbar"><div><h2>لوحة الإدارة المركزية</h2><p>إدارة المحلات والتراخيص والعملاء والأنشطة من مشروع Supabase المركزي.</p></div><div class="actions"><span class="badge">الإصدار: ${state.releaseTag}</span><button class="btn danger" id="logout-admin-btn">تسجيل الخروج</button></div></div>${noticeBlock()}<div class="grid four"><div class="card kpi"><h3>عدد المحلات</h3><strong>${state.adminData.stats.totalTenants}</strong></div><div class="card kpi"><h3>التراخيص النشطة</h3><strong>${state.adminData.stats.activeTenants}</strong></div><div class="card kpi"><h3>الموقوفة</h3><strong>${state.adminData.stats.suspendedTenants}</strong></div><div class="card kpi"><h3>عدد الفروع</h3><strong>${state.adminData.stats.totalBranches}</strong></div></div><section class="card" style="margin-top:18px"><h3>المحلات المسجلة</h3>${tenants.length ? `<div class="table-wrap"><table class="table"><thead><tr><th>المحل</th><th>المالك</th><th>النشاط</th><th>الفروع</th><th>الحالة</th><th>الخطة</th><th>إجراءات</th></tr></thead><tbody>${tenants.map((tenant) => `<tr><td>${tenant.shopName}</td><td>${tenant.ownerName}</td><td>${ACTIVITY_CATALOG.find((a) => a.key === tenant.activityKey)?.label || tenant.activityKey}</td><td>${tenant.branchCount}</td><td>${tenant.licenseStatus}</td><td>${tenant.license?.plan_code || tenant.license?.planCode || '-'}</td><td><div class="actions"><button class="btn secondary admin-license" data-id="${tenant.id}" data-status="active">تفعيل</button><button class="btn warn admin-license" data-id="${tenant.id}" data-status="pending">قيد التفعيل</button><button class="btn danger admin-license" data-id="${tenant.id}" data-status="suspended">إيقاف</button></div></td></tr>`).join('')}</tbody></table></div>` : '<div class="empty">لا توجد محلات بعد.</div>'}</section><section class="card" style="margin-top:18px"><h3>سجل الإدارة</h3>${logs.length ? `<div class="audit-list">${logs.slice(0,20).map((log) => `<div class="audit-item"><strong>${log.action}</strong><div class="stat-line">${JSON.stringify(log.details || {})} — ${formatDate(log.created_at)}</div></div>`).join('')}</div>` : '<div class="empty">لا توجد عمليات إدارية بعد.</div>'}</section></div>`;
  bindAdminEvents();
}

function bindWelcomeEvents() {
  document.querySelectorAll('[data-tab]').forEach((btn) => btn.addEventListener('click', () => { state.authTab = btn.dataset.tab; render(); }));
  document.getElementById('register-form')?.addEventListener('change', (e) => { if (e.target.name === 'activityKey') { state.registrationActivity = e.target.value; render(); } });
  document.getElementById('register-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    try { state.syncing = true; state.screen = 'loading'; render(); await registerTenant(Object.fromEntries(new FormData(e.currentTarget).entries())); } catch (error) { setErrorNotice(error); state.screen = 'welcome'; } finally { state.syncing = false; render(); }
  });
  document.getElementById('login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    try { state.syncing = true; state.screen = 'loading'; render(); const form = Object.fromEntries(new FormData(e.currentTarget).entries()); await loginTenant(form.email, form.password); } catch (error) { setErrorNotice(error); state.screen = 'welcome'; } finally { state.syncing = false; render(); }
  });
  document.getElementById('admin-bootstrap-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    try { state.syncing = true; state.screen = 'loading'; render(); await bootstrapAdmin(Object.fromEntries(new FormData(e.currentTarget).entries())); } catch (error) { setErrorNotice(error); state.screen = 'welcome'; } finally { state.syncing = false; render(); }
  });
  document.getElementById('admin-login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    try { state.syncing = true; state.screen = 'loading'; render(); const form = Object.fromEntries(new FormData(e.currentTarget).entries()); await loginAdmin(form.email, form.password); } catch (error) { setErrorNotice(error); state.screen = 'welcome'; } finally { state.syncing = false; render(); }
  });
}

function bindAppEvents() {
  document.querySelectorAll('[data-section]').forEach((btn) => btn.addEventListener('click', () => { state.section = btn.dataset.section; render(); }));
  document.getElementById('logout-btn')?.addEventListener('click', async () => { await logoutAll(); render(); });
  document.getElementById('product-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    try { state.syncing = true; state.screen = 'loading'; render(); await createProduct(Object.fromEntries(new FormData(e.currentTarget).entries())); state.screen = 'app'; } catch (error) { setErrorNotice(error); state.screen = 'app'; } finally { state.syncing = false; render(); }
  });
  document.getElementById('purchase-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    try { state.syncing = true; state.screen = 'loading'; render(); await recordPurchase(Object.fromEntries(new FormData(e.currentTarget).entries())); state.screen = 'app'; } catch (error) { setErrorNotice(error); state.screen = 'app'; } finally { state.syncing = false; render(); }
  });
  document.getElementById('branch-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    try { state.syncing = true; state.screen = 'loading'; render(); await createBranch(Object.fromEntries(new FormData(e.currentTarget).entries())); state.screen = 'app'; } catch (error) { setErrorNotice(error); state.screen = 'app'; } finally { state.syncing = false; render(); }
  });
  document.getElementById('staff-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    try { state.syncing = true; state.screen = 'loading'; render(); await createStaffUser(new FormData(e.currentTarget)); state.screen = 'app'; } catch (error) { setErrorNotice(error); state.screen = 'app'; } finally { state.syncing = false; render(); }
  });
  document.getElementById('pos-search')?.addEventListener('input', (e) => { state.posSearch = e.target.value; render(); });
  document.getElementById('print-size')?.addEventListener('change', (e) => { state.invoicePrintSize = e.target.value; });
  document.querySelectorAll('.add-cart').forEach((btn) => btn.addEventListener('click', () => addToCart(btn.dataset.product)));
  document.querySelectorAll('[data-qty]').forEach((input) => input.addEventListener('change', () => updateCartQty(input.dataset.qty, input.value)));
  document.querySelectorAll('.remove-item').forEach((btn) => btn.addEventListener('click', () => { state.cart = state.cart.filter((i) => i.productId !== btn.dataset.remove); render(); }));
  document.getElementById('checkout-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    try { state.syncing = true; state.screen = 'loading'; render(); await checkoutSale(Object.fromEntries(new FormData(e.currentTarget).entries())); state.screen = 'app'; } catch (error) { setErrorNotice(error); state.screen = 'app'; } finally { state.syncing = false; render(); }
  });
}

function bindAdminEvents() {
  document.getElementById('logout-admin-btn')?.addEventListener('click', async () => { await logoutAll(); render(); });
  document.querySelectorAll('.admin-license').forEach((btn) => btn.addEventListener('click', async () => {
    try { state.syncing = true; state.screen = 'loading'; render(); await updateLicense(btn.dataset.id, btn.dataset.status); state.screen = 'admin'; } catch (error) { setErrorNotice(error); state.screen = 'admin'; } finally { state.syncing = false; render(); }
  }));
}

function render() {
  if (state.screen === 'loading') return renderLoading();
  if (state.screen === 'welcome') return renderWelcome();
  if (state.screen === 'app') return renderApp();
  if (state.screen === 'admin') return renderAdmin();
}

if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});

(async function init() {
  try {
    validateConfig();
    await initializeSession();
  } catch (error) {
    setErrorNotice(error);
    state.screen = 'welcome';
  }
  state.syncing = false;
  render();
})();
