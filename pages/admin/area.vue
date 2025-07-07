<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
    <SidebarNavigation current-page="area" />

    <div class="flex-1 flex flex-col min-h-screen lg:ml-0 relative z-0">
      <Topbar>
        <template #title>พื้นที่ในจังหวัด</template>
      </Topbar>

      <div class="flex flex-col items-center mt-8 px-4 w-full overflow-x-hidden">
        
        <!-- Search Box -->
        <div class="mb-6 w-full max-w-5xl px-2">
          <label for="area-search" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">ค้นหาพื้นที่</label>
          <div class="relative">
            <input
              id="area-search"
              v-model="searchQuery"
              type="text"
              placeholder="ค้นหาจังหวัด..."
              class="w-full border rounded-lg pl-10 pr-4 py-2 sm:py-3 text-base sm:text-lg bg-white dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
            />
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>

        <!-- Selector Controls -->
        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 mb-6 w-full max-w-5xl px-2">
          <!-- Province Selector -->
          <div class="sm:col-span-2 xl:col-span-1">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">เลือกจังหวัด</label>
            <select
              v-model="selectedProvince"
              @change="onProvinceChange"
              class="w-full border rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-base sm:text-lg bg-white dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
            >
              <option v-for="province in filteredProvinces" :key="province.name" :value="province">
                {{ province.name }}
              </option>
            </select>
          </div>

          <!-- District Selector -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">เลือกอำเภอ</label>
            <select
              v-model="selectedAmphoe"
              @change="onAmphoeChange"
              class="w-full border rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-base sm:text-lg bg-white dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
              :disabled="!selectedProvince || availableAmphoes.length === 0"
            >
              <option :value="null">-- เลือกอำเภอ --</option>
              <option v-for="amphoe in availableAmphoes" :key="amphoe.name" :value="amphoe">
                {{ amphoe.name }}
              </option>
            </select>
          </div>

          <!-- Subdistrict Selector -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">เลือกตำบล</label>
            <select
              v-model="selectedTambon"
              @change="onTambonChange"
              class="w-full border rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-base sm:text-lg bg-white dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
              :disabled="!selectedAmphoe || availableTambons.length === 0"
            >
              <option :value="null">-- เลือกตำบล --</option>
              <option v-for="tambon in availableTambons" :key="tambon.name" :value="tambon">
                {{ tambon.name }}
              </option>
            </select>
          </div>
        </div>

        <!-- Current Selection Display -->
        <div class="mb-4 sm:mb-6 text-center px-4">
          <div class="text-blue-700 dark:text-blue-400 font-semibold text-base sm:text-lg">
            พื้นที่ที่เลือก: {{ selectedProvince.name }}
            <span v-if="selectedAmphoe"> > {{ selectedAmphoe.name }}</span>
            <span v-if="selectedTambon"> > {{ selectedTambon.name }}</span>
          </div>
          <div class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
            <span v-if="!selectedAmphoe">แสดงทุกอำเภอในจังหวัด</span>
            <span v-else-if="!selectedTambon">แสดงทุกตำบลในอำเภอ</span>
            <span v-else>แสดงเฉพาะตำบลที่เลือก</span>
          </div>
        </div>

        <!-- Map Container -->
        <div class="w-full max-w-7xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 sm:p-4 mx-2 relative z-0">
          <div class="h-64 sm:h-80 md:h-96 w-full relative rounded-lg overflow-hidden">
            <ClientOnly>
              <LMap
                ref="map"
                :zoom="zoom"
                :center="center"
                :use-global-leaflet="false"
                class="h-full w-full"
              >
                <LTileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                  layer-type="base"
                  name="OpenStreetMap"
                />
                
                <!-- District Boundaries -->
                <LPolygon
                  v-if="showBoundary && showTambonMode && selectedAmphoe"
                  :lat-lngs="selectedAmphoe.boundary"
                  :color="'#3B82F6'"
                  :weight="3"
                  :opacity="0.8"
                  :fill="true"
                  :fillColor="'#3B82F6'"
                  :fillOpacity="0.1"
                >
                  <LPopup>
                    <div class="text-center p-3 min-w-[200px]">
                      <h3 class="font-bold text-lg mb-2 text-blue-600">
                        {{ selectedAmphoe.name }}
                      </h3>
                      <div class="text-xs uppercase tracking-wide mb-2 text-blue-500">
                        ขอบเขตอำเภอ
                      </div>
                      <div class="text-sm text-gray-600 space-y-1">
                        <p>ประชากร: {{ selectedAmphoe.population.toLocaleString() }} คน</p>
                        <p>พื้นที่: {{ selectedAmphoe.area }} ตร.กม.</p>
                        <p>จำนวนตำบล: {{ selectedAmphoe.subdistricts }} ตำบล</p>
                      </div>
                      <p class="text-xs text-gray-500 mt-2">{{ selectedAmphoe.description }}</p>
                    </div>
                  </LPopup>
                </LPolygon>

                <!-- District Markers -->
                <LMarker
                  v-for="marker in displayedMarkers.filter(m => m.iconType === 'checkin')"
                  :key="marker.id"
                  :lat-lng="marker.coordinates"
                  @click="selectLocation(marker)"
                  :icon="checkinIcon"
                >
                  <LPopup>
                    <div class="text-center p-3 min-w-[200px]">
                                              <h3 class="font-bold text-lg mb-2" :class="marker.type === 'district' ? 'text-blue-600' : 'text-green-600'">
                        {{ marker.name }}
                      </h3>
                      <div class="text-xs uppercase tracking-wide mb-2" :class="marker.type === 'district' ? 'text-blue-500' : 'text-green-500'">
                        {{ marker.type === 'district' ? 'อำเภอ' : 'ตำบล' }}
                      </div>
                      <div class="text-sm text-gray-600 space-y-1">
                        <p v-if="marker.population">ประชากร: {{ marker.population.toLocaleString() }} คน</p>
                        <p v-if="marker.area">พื้นที่: {{ marker.area }} ตร.กม.</p>
                        <p v-if="marker.villages">จำนวนหมู่บ้าน: {{ marker.villages }} หมู่</p>
                        <p v-if="marker.subdistricts">จำนวนตำบล: {{ marker.subdistricts }} ตำบล</p>
                      </div>
                      <p class="text-xs text-gray-500 mt-2">{{ marker.description }}</p>
                      <button
                        @click="selectLocation(marker)"
                        class="mt-3 bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition"
                      >
                        เลือก{{ marker.type === 'district' ? 'อำเภอ' : 'ตำบล' }}นี้
                      </button>
                    </div>
                  </LPopup>
                </LMarker>
              </LMap>
            </ClientOnly>
          </div>

          <!-- Information Panel -->
          <div class="mt-4 sm:mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            <!-- District Information -->
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 sm:p-4">
              <h3 class="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                <svg class="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
                {{ selectedAmphoe ? `ข้อมูล${selectedAmphoe.name}` : 'เลือกอำเภอเพื่อดูข้อมูล' }}
              </h3>
              <div v-if="selectedAmphoe" class="space-y-2">
                <p class="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                  <span class="font-semibold">ประชากร:</span> {{ selectedAmphoe.population.toLocaleString() }} คน
                </p>
                <p class="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                  <span class="font-semibold">พื้นที่:</span> {{ selectedAmphoe.area }} ตร.กม.
                </p>
                <p class="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                  <span class="font-semibold">จำนวนตำบล:</span> {{ selectedAmphoe.subdistricts }} ตำบล
                </p>
                <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-3">
                  {{ selectedAmphoe.description }}
                </p>
              </div>
              <div v-else class="text-gray-500 dark:text-gray-400 text-center py-6 sm:py-8">
                <svg class="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 20l-5.447-2.724A1 1 0 073 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7"></path>
                </svg>
                <p class="text-sm">กรุณาเลือกอำเภอเพื่อดูข้อมูลรายละเอียด</p>
              </div>
            </div>

            <!-- Subdistrict Information -->
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 sm:p-4">
              <h3 class="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                <svg class="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                {{ selectedTambon ? `ข้อมูล${selectedTambon.name}` : 'เลือกตำบลเพื่อดูข้อมูล' }}
              </h3>
              <div v-if="selectedTambon" class="space-y-2">
                <p class="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                  <span class="font-semibold">ประชากร:</span> {{ selectedTambon.population?.toLocaleString() || 'ไม่ระบุ' }} คน
                </p>
                <p class="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                  <span class="font-semibold">พื้นที่:</span> {{ selectedTambon.area || 'ไม่ระบุ' }} ตร.กม.
                </p>
                <p class="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                  <span class="font-semibold">จำนวนหมู่บ้าน:</span> {{ selectedTambon.villages || 'ไม่ระบุ' }} หมู่
                </p>
                <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-3">
                  {{ selectedTambon.description }}
                </p>
              </div>
              <div v-else class="text-gray-500 dark:text-gray-400 text-center py-6 sm:py-8">
                <svg class="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 20l-5.447-2.724A1 1 0 713 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7"></path>
                </svg>
                <p class="text-sm">กรุณาเลือกตำบลเพื่อดูข้อมูลรายละเอียด</p>
              </div>
            </div>

            <!-- Research Information -->
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 sm:p-4 md:col-span-2 xl:col-span-1">
              <h3 class="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                <svg class="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                งานวิจัยในพื้นที่
              </h3>
              <div v-if="selectedTambon && selectedTambon.research" class="space-y-3">
                <div class="bg-white dark:bg-gray-600 rounded-lg p-3">
                  <h4 class="font-semibold text-gray-800 dark:text-gray-200 mb-2">ข้อมูลงานวิจัย {{ selectedTambon.name }}</h4>
                  <div class="grid grid-cols-3 gap-2 text-sm mb-3">
                    <div class="text-center">
                      <div class="font-bold text-purple-600">{{ selectedTambon.research.projects.length }}</div>
                      <div class="text-gray-600 dark:text-gray-400">โครงการ</div>
                    </div>
                    <div class="text-center">
                      <div class="font-bold text-blue-600">{{ selectedTambon.research.publications }}</div>
                      <div class="text-gray-600 dark:text-gray-400">บทความ</div>
                    </div>
                    <div class="text-center">
                      <div class="font-bold text-green-600">{{ selectedTambon.research.ongoingStudies }}</div>
                      <div class="text-gray-600 dark:text-gray-400">กำลังศึกษา</div>
                    </div>
                  </div>
                  <div v-if="selectedTambon.research.projects.length > 0" class="space-y-2">
                    <h5 class="font-medium text-gray-700 dark:text-gray-300">โครงการล่าสุด:</h5>
                    <div v-for="project in selectedTambon.research.projects.slice(0, 2)" :key="project.title" 
                         class="text-xs bg-gray-100 dark:bg-gray-500 rounded p-2">
                      <div class="font-medium text-gray-800 dark:text-gray-200">{{ project.title }}</div>
                      <div class="text-gray-600 dark:text-gray-400 mt-1">{{ project.researcher }} ({{ project.year }})</div>
                      <span class="inline-block mt-1 px-2 py-1 text-xs rounded" 
                            :class="project.status === 'กำลังดำเนินการ' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'">
                        {{ project.status }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else-if="selectedAmphoe && selectedAmphoe.research" class="space-y-3">
                <div class="bg-white dark:bg-gray-600 rounded-lg p-3">
                  <h4 class="font-semibold text-gray-800 dark:text-gray-200 mb-2">ข้อมูลงานวิจัย {{ selectedAmphoe.name }}</h4>
                  <div class="grid grid-cols-3 gap-2 text-sm mb-3">
                    <div class="text-center">
                      <div class="font-bold text-purple-600">{{ selectedAmphoe.research.projects.length }}</div>
                      <div class="text-gray-600 dark:text-gray-400">โครงการ</div>
                    </div>
                    <div class="text-center">
                      <div class="font-bold text-blue-600">{{ selectedAmphoe.research.publications }}</div>
                      <div class="text-gray-600 dark:text-gray-400">บทความ</div>
                    </div>
                    <div class="text-center">
                      <div class="font-bold text-green-600">{{ selectedAmphoe.research.ongoingStudies }}</div>
                      <div class="text-gray-600 dark:text-gray-400">กำลังศึกษา</div>
                    </div>
                  </div>
                  <div v-if="selectedAmphoe.research.projects.length > 0" class="space-y-2">
                    <h5 class="font-medium text-gray-700 dark:text-gray-300">โครงการล่าสุด:</h5>
                    <div v-for="project in selectedAmphoe.research.projects.slice(0, 2)" :key="project.title" 
                         class="text-xs bg-gray-100 dark:bg-gray-500 rounded p-2">
                      <div class="font-medium text-gray-800 dark:text-gray-200">{{ project.title }}</div>
                      <div class="text-gray-600 dark:text-gray-400 mt-1">{{ project.researcher }} ({{ project.year }})</div>
                      <span class="inline-block mt-1 px-2 py-1 text-xs rounded" 
                            :class="project.status === 'กำลังดำเนินการ' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'">
                        {{ project.status }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="text-gray-500 dark:text-gray-400 text-center py-8">
                <svg class="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <p>เลือกพื้นที่เพื่อดูข้อมูลงานวิจัย</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="mt-4 sm:mt-6 flex flex-wrap gap-2 sm:gap-3 justify-center px-4">
          <button
            @click="centerOnLocation"
            class="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center text-sm sm:text-base"
          >
            <svg class="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            ไปยังพื้นที่ที่เลือก
          </button>
          
          <button
            @click="showAllTambons"
            class="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center text-sm sm:text-base"
          >
            <svg class="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 713 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7"></path>
            </svg>
            <span class="hidden xs:inline">แสดงทุกตำบลในอำเภอ</span>
            <span class="xs:hidden">แสดงตำบล</span>
          </button>
          
          <button
            @click="resetMap"
            class="bg-gray-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-700 transition flex items-center text-sm sm:text-base"
          >
            <svg class="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            รีเซ็ตแผนที่
          </button>

          <button
            @click="toggleViewMode"
            class="bg-purple-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-purple-700 transition flex items-center text-sm sm:text-base"
          >
            <svg class="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
            </svg>
            <span class="hidden sm:inline">{{ showTambonMode ? 'แสดงเฉพาะอำเภอ' : 'แสดงพร้อมตำบล' }}</span>
            <span class="sm:hidden">{{ showTambonMode ? 'อำเภอ' : 'ตำบล' }}</span>
          </button>

          <button
            @click="toggleBoundary"
            class="bg-indigo-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center text-sm sm:text-base"
            :disabled="!showTambonMode"
          >
            <svg class="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 713 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7"></path>
            </svg>
            <span class="hidden sm:inline">{{ showBoundary ? 'ซ่อนขอบเขต' : 'แสดงขอบเขต' }}</span>
            <span class="sm:hidden">ขอบเขต</span>
          </button>

          <button
            v-if="(selectedAmphoe && selectedAmphoe.research) || (selectedTambon && selectedTambon.research)"
            @click="showResearchDetails"
            class="bg-purple-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-purple-700 transition flex items-center text-sm sm:text-base"
          >
            <svg class="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <span class="hidden sm:inline">รายละเอียดงานวิจัย</span>
            <span class="sm:hidden">วิจัย</span>
          </button>
        </div>

        <!-- Statistics Summary -->
        <div class="mt-6 sm:mt-8 w-full max-w-6xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 mx-2">
          <h3 class="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">สรุปข้อมูล{{ selectedProvince.name }}</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <div class="text-center">
              <div class="text-2xl sm:text-3xl font-bold text-blue-600">{{ availableAmphoes.length }}</div>
              <div class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">อำเภอ</div>
            </div>
            <div class="text-center">
              <div class="text-2xl sm:text-3xl font-bold text-green-600">{{ totalTambons }}</div>
              <div class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">ตำบล</div>
            </div>
            <div class="text-center">
              <div class="text-xl sm:text-2xl md:text-3xl font-bold text-purple-600">{{ totalPopulation.toLocaleString() }}</div>
              <div class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">ประชากรรวม</div>
            </div>
            <div class="text-center">
              <div class="text-xl sm:text-2xl md:text-3xl font-bold text-orange-600">{{ totalArea.toFixed(1) }}</div>
              <div class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">พื้นที่รวม (ตร.กม.)</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- เพิ่มใน <template> ด้านล่างสุด -->
    <ResearchModal
      v-if="showResearchModal"
      :research="modalResearchData"
      :area-name="modalAreaName"
      @close="showResearchModal = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Icon } from 'leaflet'

// Leaflet imports (Client-side only)
const LMap = defineAsyncComponent(() => import('@vue-leaflet/vue-leaflet').then(m => m.LMap))
const LTileLayer = defineAsyncComponent(() => import('@vue-leaflet/vue-leaflet').then(m => m.LTileLayer))
const LMarker = defineAsyncComponent(() => import('@vue-leaflet/vue-leaflet').then(m => m.LMarker))
const LPopup = defineAsyncComponent(() => import('@vue-leaflet/vue-leaflet').then(m => m.LPopup))
const LPolygon = defineAsyncComponent(() => import('@vue-leaflet/vue-leaflet').then(m => m.LPolygon))

// Province data with districts
const provinces = ref([
  {
    name: 'จังหวัดเพชรบุรี',
    coordinates: [13.1119, 99.9447],
    amphoes: [
      {
        name: 'อ.เมืองเพชรบุรี',
        coordinates: [13.1119, 99.9447],
        population: 124388,
        area: 746.94,
        subdistricts: 24,
        description: 'ศูนย์กลางการปกครองและเศรษฐกิจของจังหวัด มีพระราชวังและวัดสำคัญหลายแห่ง',
        research: {
          projects: [
            { title: 'การศึกษาผลกระทบของการท่องเที่ยวต่อชุมชนในเมืองเพชรบุรี', researcher: 'มหาวิทยาลัยราชภัฏเพชรบุรี', year: '2023', status: 'กำลังดำเนินการ' },
            { title: 'การอนุรักษ์มรดกทางวัฒนธรรมในย่านเมืองเก่าเพชรบุรี', researcher: 'จุฬาลงกรณ์มหาวิทยาลัย', year: '2022', status: 'เสร็จสิ้น' },
            { title: 'ศึกษาคุณภาพน้ำในคลองเพชรบุรี', researcher: 'มหาวิทยาลัยเกษตรศาสตร์', year: '2023', status: 'กำลังดำเนินการ' }
          ],
          publications: 12,
          ongoingStudies: 5
        },
        boundary: [
          [13.0800, 99.9100], [13.0900, 99.9800], [13.1400, 99.9900], 
          [13.1600, 99.9600], [13.1500, 99.9200], [13.1200, 99.8900], 
          [13.0900, 99.9000], [13.0800, 99.9100]
        ] as [number, number][],
        tambons: [
          { name: 'ตำบลท่าราบ', coordinates: [13.1126, 99.9463], population: 20452, villages: 0, description: 'ที่ตั้งศาลากลางจังหวัด', research: { projects: [ { title: 'โครงการวิจัยตำบลท่าราบ', researcher: 'มหาวิทยาลัยราชภัฏเพชรบุรี', year: '2023', status: 'กำลังดำเนินการ' } ], publications: 2, ongoingStudies: 1 } },
          { name: 'ตำบลคลองกระแชง', coordinates: [13.1099, 99.9408], population: 10459, villages: 0, description: 'ย่านการค้าใจกลางเมือง', research: undefined },
          { name: 'ตำบลบางจาน', coordinates: [13.0633, 99.9325], population: 4209, villages: 8, description: 'ชุมชนเกษตรกรรมริมน้ำ', research: undefined },
          { name: 'ตำบลนาวุ้ง', coordinates: [13.1384, 99.8974], population: 3568, villages: 6, description: 'พื้นที่เกษตรกรรม', research: undefined },
          { name: 'ตำบลช่องสะแก', coordinates: [13.0857, 99.8824], population: 9477, villages: 8, description: 'ชุมชนและพื้นที่เกษตรกรรม', research: undefined },
          { name: 'ตำบลบ้านกุ่ม', coordinates: [13.0456, 99.9468], population: 8393, villages: 12, description: 'แหล่งผลิตน้ำตาลโตนด', research: undefined },
          { name: 'ตำบลหนองโสน', coordinates: [13.0801, 99.9839], population: 6512, villages: 6, description: 'พื้นที่เกษตรกรรม', research: undefined },
          { name: 'ตำบลไร่ส้ม', coordinates: [13.1022, 99.9079], population: 8760, villages: 7, description: 'พื้นที่เกษตรกรรมและสวนผลไม้', research: undefined },
          { name: 'ตำบลต้นมะม่วง', coordinates: [13.1234, 99.9161], population: 7651, villages: 6, description: 'ที่ตั้งหน่วยงานราชการ', research: undefined }
        ]
      },
      {
        name: 'อ.เขาย้อย',
        coordinates: [13.2374, 99.8242] as [number, number],
        population: 37372,
        area: 295.4,
        subdistricts: 10,
        description: 'อำเภอที่มีชื่อเสียงด้านถ้ำและธรรมชาติที่สวยงาม',
        research: {
          projects: [
            { title: 'การศึกษาระบบนิเวศป่าไผ่ในเขตเขาย้อย', researcher: 'มหาวิทยาลัยเกษตรศาสตร์', year: '2023', status: 'กำลังดำเนินการ' },
            { title: 'การพัฒนาการท่องเที่ยวเชิงนิเวศในพื้นที่ป่าไผ่', researcher: 'มหาวิทยาลัยราชภัฏเพชรบุรี', year: '2022', status: 'เสร็จสิ้น' }
          ],
          publications: 6,
          ongoingStudies: 2
        },
        boundary: [
          [13.1700, 99.7800], [13.1800, 99.8500], [13.2300, 99.8600], 
          [13.2400, 99.8200], [13.2200, 99.7900], [13.1900, 99.7700], 
          [13.1700, 99.7800]
        ] as [number, number][],
        tambons: [
          { name: 'ตำบลเขาย้อย', coordinates: [13.2374, 99.8242] as [number, number], population: 8466, villages: 7, description: 'ที่ตั้งที่ว่าการอำเภอ' },
          { name: 'ตำบลสระพัง', coordinates: [13.2842, 99.8437] as [number, number], population: 4793, villages: 6, description: 'พื้นที่เกษตรกรรม' },
          { name: 'ตำบลบางเค็ม', coordinates: [13.2647, 99.8887] as [number, number], population: 2854, villages: 5, description: 'ชุมชนประมงชายฝั่ง' },
          { name: 'ตำบลทับคาง', coordinates: [13.2081, 99.7891] as [number, number], population: 5210, villages: 5, description: 'แหล่งอุตสาหกรรมโรงโม่หิน' },
          { name: 'ตำบลหนองปรง', coordinates: [13.3168, 99.7816] as [number, number], population: 6451, villages: 10, description: 'พื้นที่เกษตรกรรมและเลี้ยงสัตว์' }
        ]
      },
      {
        name: 'อ.หนองหญ้าปล้อง',
        coordinates: [13.1611, 99.6455] as [number, number],
        population: 17290,
        area: 1237.9,
        subdistricts: 4,
        description: 'อำเภอแห่งขุนเขาและป่าไม้ มีอุทยานแห่งชาติแก่งกระจานบางส่วน',
        boundary: [
          [13.0100, 99.7200], [13.0200, 99.7900], [13.0700, 99.8000], 
          [13.0800, 99.7500], [13.0600, 99.7100], [13.0200, 99.7000], 
          [13.0100, 99.7200]
        ] as [number, number][],
        tambons: [
          { name: 'ตำบลหนองหญ้าปล้อง', coordinates: [13.1611, 99.6455] as [number, number], population: 7304, villages: 10, description: 'ที่ตั้งที่ว่าการอำเภอ' },
          { name: 'ตำบลยางน้ำกลัดเหนือ', coordinates: [13.2201, 99.5898] as [number, number], population: 2191, villages: 5, description: 'ชุมชนในหุบเขา' },
          { name: 'ตำบลยางน้ำกลัดใต้', coordinates: [13.1364, 99.5671] as [number, number], population: 2146, villages: 6, description: 'พื้นที่เกษตรกรรมและป่าไม้' },
          { name: 'ตำบลท่าตะคร้อ', coordinates: [13.2612, 99.6748] as [number, number], population: 5649, villages: 8, description: 'ชุมชนริมแม่น้ำเพชรบุรี' }
        ]
      },
      {
        name: 'อ.ชะอำ',
        coordinates: [12.7992, 99.9654] as [number, number],
        population: 83993,
        area: 289.4,
        subdistricts: 9,
        description: 'เมืองท่องเที่ยวชายทะเลที่มีชื่อเสียงระดับประเทศ',
        boundary: [
          [12.7400, 99.9200], [12.7500, 100.0100], [12.8200, 100.0200], 
          [12.8400, 99.9800], [12.8300, 99.9300], [12.7900, 99.9100], 
          [12.7500, 99.9200], [12.7400, 99.9200]
        ] as [number, number][],
        tambons: [
          { name: 'ตำบลชะอำ', coordinates: [12.7992, 99.9654] as [number, number], population: 44040, villages: 0, description: 'ศูนย์กลางการท่องเที่ยวและหาดชะอำ' },
          { name: 'ตำบลบางเก่า', coordinates: [12.8795, 99.9827] as [number, number], population: 6942, villages: 9, description: 'ชุมชนประมงและเกษตรกรรม' },
          { name: 'ตำบลนายาง', coordinates: [12.7758, 99.8863] as [number, number], population: 5262, villages: 8, description: 'ที่ตั้งโครงการพระราชดำริ' },
          { name: 'ตำบลเขาใหญ่', coordinates: [12.7169, 99.9077] as [number, number], population: 10769, villages: 10, description: 'พื้นที่ภูเขาและแหล่งท่องเที่ยว' },
          { name: 'ตำบลหนองศาลา', coordinates: [12.8315, 99.9234] as [number, number], population: 3144, villages: 7, description: 'ชุมชนเกษตรกรรม' }
        ]
      },
      {
        name: 'อ.ท่ายาง',
        coordinates: [12.919, 99.8824] as [number, number],
        population: 86603,
        area: 794.6,
        subdistricts: 12,
        description: 'อำเภอเกษตรกรรมที่สำคัญ แหล่งปลูกพืชเศรษฐกิจนานาชนิด',
        boundary: [
          [13.1200, 99.8100], [13.1300, 99.8800], [13.1800, 99.8900], 
          [13.2000, 99.8500], [13.1900, 99.8000], [13.1500, 99.7900], 
          [13.1200, 99.8100]
        ] as [number, number][],
        tambons: [
          { name: 'ตำบลท่ายาง', coordinates: [12.919, 99.8824] as [number, number], population: 11956, villages: 0, description: 'ที่ตั้งที่ว่าการอำเภอและชุมชนตลาด' },
          { name: 'ตำบลท่าคอย', coordinates: [12.9698, 99.9041] as [number, number], population: 10214, villages: 9, description: 'ชุมชนเก่าแก่ริมแม่น้ำเพชรบุรี' },
          { name: 'ตำบลยางหย่อง', coordinates: [12.868, 99.8706] as [number, number], population: 5410, villages: 6, description: 'พื้นที่เกษตรกรรม' },
          { name: 'ตำบลหนองจอก', coordinates: [12.8953, 99.8242] as [number, number], population: 8903, villages: 12, description: 'พื้นที่เกษตรกรรมและฟาร์มโคนม' },
          { name: 'ตำบลมาบปลาเค้า', coordinates: [12.8606, 99.9443] as [number, number], population: 3878, villages: 7, description: 'ชุมชนและพื้นที่เกษตรกรรม' }
        ]
      },
      {
        name: 'อ.บ้านลาด',
        coordinates: [13.0457, 99.8105] as [number, number],
        population: 52932,
        area: 288.5,
        subdistricts: 18,
        description: 'อำเภอแห่งเกษตรกรรมและวัฒนธรรมท้องถิ่น',
        boundary: [
          [13.2500, 99.6600], [13.2600, 99.7300], [13.3100, 99.7400], 
          [13.3200, 99.7000], [13.3000, 99.6500], [13.2700, 99.6400], 
          [13.2500, 99.6600]
        ] as [number, number][],
        tambons: [
          { name: 'ตำบลบ้านลาด', coordinates: [13.0457, 99.8105] as [number, number], population: 4330, villages: 6, description: 'ที่ตั้งที่ว่าการอำเภอ' },
          { name: 'ตำบลบ้านหาด', coordinates: [13.064, 99.8475] as [number, number], population: 3953, villages: 6, description: 'ชุมชนริมแม่น้ำเพชรบุรี' },
          { name: 'ตำบลตำหรุ', coordinates: [13.0315, 99.8654] as [number, number], population: 2623, villages: 6, description: 'พื้นที่เกษตรกรรม' },
          { name: 'ตำบลไร่โคก', coordinates: [12.9982, 99.7825] as [number, number], population: 3373, villages: 6, description: 'แหล่งปลูกข้าวและพืชไร่' },
          { name: 'ตำบลท่าเสน', coordinates: [13.1118, 99.7995] as [number, number], population: 4944, villages: 9, description: 'ชุมชนเกษตรกรรม' }
        ]
      },
      {
        name: 'อ.บ้านแหลม',
        coordinates: [13.1751, 99.991] as [number, number],
        population: 52402,
        area: 202.9,
        subdistricts: 10,
        description: 'อำเภอชายฝั่งทะเล แหล่งประมงและนาเกลือที่สำคัญ',
        boundary: [
          [12.6400, 99.9900], [12.6500, 100.0600], [12.7200, 100.0700], 
          [12.7300, 100.0300], [12.7100, 99.9800], [12.6700, 99.9700], 
          [12.6400, 99.9900]
        ] as [number, number][],
        tambons: [
          { name: 'ตำบลบ้านแหลม', coordinates: [13.1751, 99.991] as [number, number], population: 14755, villages: 9, description: 'ที่ตั้งที่ว่าการอำเภอและท่าเรือประมง' },
          { name: 'ตำบลบางขุนไทร', coordinates: [13.2427, 99.988] as [number, number], population: 5389, villages: 9, description: 'ชุมชนประมงและนาเกลือ' },
          { name: 'ตำบลปากทะเล', coordinates: [13.0975, 100.0272] as [number, number], population: 4505, villages: 6, description: 'แหล่งดูนกชายเลนที่มีชื่อเสียง' },
          { name: 'ตำบลบางแก้ว', coordinates: [13.0465, 100.0152] as [number, number], population: 5406, villages: 8, description: 'ชุมชนประมง' },
          { name: 'ตำบลแหลมผักเบี้ย', coordinates: [13.011, 100.081] as [number, number], population: 3009, villages: 4, description: 'ที่ตั้งโครงการศึกษาวิจัยและพัฒนาสิ่งแวดล้อมแหลมผักเบี้ย' }
        ]
      },
      {
        name: 'อ.แก่งกระจาน',
        coordinates: [12.8942, 99.6418] as [number, number],
        population: 31690,
        area: 2520.1,
        subdistricts: 6,
        description: 'อำเภอที่ใหญ่ที่สุดในจังหวัด ที่ตั้งของอุทยานแห่งชาติแก่งกระจาน',
        boundary: [
          [12.7800, 99.4500], [12.7900, 99.5400], [12.8700, 99.5500], 
          [12.8800, 99.5000], [12.8600, 99.4400], [12.8200, 99.4300], 
          [12.7800, 99.4500]
        ] as [number, number][],
        tambons: [
          { name: 'ตำบลแก่งกระจาน', coordinates: [12.8942, 99.6418] as [number, number], population: 7660, villages: 14, description: 'ที่ตั้งที่ว่าการอำเภอและเขื่อนแก่งกระจาน' },
          { name: 'ตำบลสองพี่น้อง', coordinates: [12.993, 99.5397] as [number, number], population: 4579, villages: 8, description: 'ชุมชนใกล้ผืนป่าตะวันตก' },
          { name: 'ตำบลวังจันทร์', coordinates: [12.9806, 99.7042] as [number, number], population: 4402, villages: 8, description: 'พื้นที่เกษตรกรรม' },
          { name: 'ตำบลป่าเด็ง', coordinates: [12.7214, 99.4294] as [number, number], population: 6310, villages: 12, description: 'ชุมชนติดชายแดน' },
          { name: 'ตำบลพุสวรรค์', coordinates: [13.056, 99.6387] as [number, number], population: 4016, villages: 6, description: 'พื้นที่เกษตรกรรมและป่าไม้' },
          { name: 'ตำบลห้วยแม่เพรียง', coordinates: [12.8624, 99.3664] as [number, number], population: 4723, villages: 8, description: 'ชุมชนในเขตอุทยานแห่งชาติ' }
        ]
      }
    ]
  },
  {
    name: 'จังหวัดราชบุรี',
    coordinates: [13.5282, 99.8134] as [number, number],
    amphoes: [
      {
        name: 'อ.เมืองราชบุรี',
        coordinates: [13.5282, 99.8134] as [number, number],
        population: 189543,
        area: 285.6,
        subdistricts: 18,
        description: 'ศูนย์กลางการปกครองของจังหวัดราชบุรี มีแหล่งท่องเที่ยวทางวัฒนธรรม',
        boundary: [[13.5000, 99.7800], [13.5600, 99.8500], [13.5400, 99.7900]] as [number, number][],
        tambons: [
          { name: 'ตำบลหน้าเมือง', coordinates: [13.5382, 99.8234] as [number, number], population: 12543, area: 15.2, villages: 12, description: 'ศูนย์กลางเมืองราชบุรี' }
        ]
      }
    ]
  },
  { name: 'กรุงเทพมหานคร', coordinates: [13.7563, 100.5018], amphoes: [] },
  { name: 'จังหวัดชัยนาท', coordinates: [15.1856, 100.1241], amphoes: [] },
  { name: 'จังหวัดนครนายก', coordinates: [14.2079, 101.2117], amphoes: [] },
  { name: 'จังหวัดนครปฐม', coordinates: [13.8184, 100.0618], amphoes: [] },
  { name: 'จังหวัดนนทบุรี', coordinates: [13.859, 100.5218], amphoes: [] },
  { name: 'จังหวัดปทุมธานี', coordinates: [14.0208, 100.525], amphoes: [] },
  { name: 'จังหวัดพระนครศรีอยุธยา', coordinates: [14.3541, 100.5694], amphoes: [] },
  { name: 'จังหวัดลพบุรี', coordinates: [14.7984, 100.6529], amphoes: [] },
  { name: 'จังหวัดสมุทรปราการ', coordinates: [13.5993, 100.5967], amphoes: [] },
  { name: 'จังหวัดสมุทรสงคราม', coordinates: [13.414, 100.0016], amphoes: [] },
  { name: 'จังหวัดสมุทรสาคร', coordinates: [13.5491, 100.2736], amphoes: [] },
  { name: 'จังหวัดสระบุรี', coordinates: [14.529, 100.912], amphoes: [] },
  { name: 'จังหวัดสิงห์บุรี', coordinates: [14.8878, 100.4042], amphoes: [] },
  { name: 'จังหวัดสุพรรณบุรี', coordinates: [14.471, 100.1171], amphoes: [] },
  { name: 'จังหวัดอ่างทอง', coordinates: [14.587, 100.4552], amphoes: [] },
  { name: 'จังหวัดกาญจนบุรี', coordinates: [14.0229, 99.5263], amphoes: [] },
  { name: 'จังหวัดประจวบคีรีขันธ์', coordinates: [11.8054, 99.7945], amphoes: [] }
])

const selectedProvince = ref(provinces.value[0])
const selectedAmphoe = ref(null as any)
const selectedTambon = ref(null as any)
const zoom = ref(10)
const center = ref([13.1119, 99.9447] as [number, number])
const showTambonMode = ref(false)
const showBoundary = ref(true)
const map = ref(null)

const searchQuery = ref('')

const showResearchModal = ref(false)
const modalResearchData = ref(null as any)
const modalAreaName = ref('')

const checkinIcon = new Icon({
  iconUrl: '/images/checkin-icon.png', // หรือใช้ SVG base64 data URI
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
})

// Computed properties
const filteredProvinces = computed(() => {
  if (!searchQuery.value) {
    return provinces.value
  }
  return provinces.value.filter(p => 
    p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const availableAmphoes = computed(() => {
  return selectedProvince.value?.amphoes || []
})

const availableTambons = computed(() => {
  return selectedAmphoe.value?.tambons || []
})

const displayedMarkers = computed(() => {
  const markers = []
  // --- เช็คอิน marker สำหรับอำเภอที่มีงานวิจัย ---
  availableAmphoes.value.forEach(amphoe => {
    if ('research' in amphoe && amphoe.research && amphoe.research.projects && amphoe.research.projects.length > 0) {
      markers.push({
        id: `checkin-district-${amphoe.name}`,
        name: amphoe.name,
        coordinates: amphoe.coordinates,
        type: 'checkin',
        iconType: 'checkin',
        research: true
      })
    }
  })
  // --- เช็คอิน marker สำหรับตำบลที่มีงานวิจัย ---
  availableAmphoes.value.forEach(amphoe => {
    if (amphoe.tambons) {
      amphoe.tambons.forEach(tambon => {
        if (tambon && 'research' in tambon && tambon.research && tambon.research.projects && tambon.research.projects.length > 0) {
          markers.push({
            id: `checkin-tambon-${tambon.name}`,
            name: tambon.name,
            coordinates: tambon.coordinates,
            type: 'checkin',
            iconType: 'checkin',
            research: true
          })
        }
      })
    }
  })
  
  if (showTambonMode.value && selectedAmphoe.value) {
    // Show district center
    markers.push({
      id: `district-${selectedAmphoe.value.name}`,
      name: selectedAmphoe.value.name,
      coordinates: selectedAmphoe.value.coordinates,
      type: 'district',
      population: selectedAmphoe.value.population,
      area: selectedAmphoe.value.area,
      subdistricts: selectedAmphoe.value.subdistricts,
      description: selectedAmphoe.value.description,
      iconType: undefined // or 'default'
    })
    
    // Show tambons
    if (selectedTambon.value) {
      // Show only selected tambon
      markers.push({
        id: `tambon-${selectedTambon.value.name}`,
        name: selectedTambon.value.name,
        coordinates: selectedTambon.value.coordinates,
        type: 'tambon',
        population: selectedTambon.value.population,
        area: selectedTambon.value.area,
        villages: selectedTambon.value.villages,
        description: selectedTambon.value.description
      })
    } else {
      // Show all tambons in selected amphoe
      availableTambons.value.forEach((tambon: any) => {
        markers.push({
          id: `tambon-${tambon.name}`,
          name: tambon.name,
          coordinates: tambon.coordinates,
          type: 'tambon',
          population: tambon.population,
          area: tambon.area,
          villages: tambon.villages,
          description: tambon.description
        })
      })
    }
  } else if (selectedAmphoe.value) {
    // Show only selected district
    markers.push({
      id: `district-${selectedAmphoe.value.name}`,
      name: selectedAmphoe.value.name,
      coordinates: selectedAmphoe.value.coordinates,
      type: 'district',
      population: selectedAmphoe.value.population,
      area: selectedAmphoe.value.area,
      subdistricts: selectedAmphoe.value.subdistricts,
      description: selectedAmphoe.value.description,
      iconType: undefined // or 'default'
    })
  } else {
    // Show all districts in selected province
    availableAmphoes.value.forEach(amphoe => {
      markers.push({
        id: `district-${amphoe.name}`,
        name: amphoe.name,
        coordinates: amphoe.coordinates,
        type: 'district',
        population: amphoe.population,
        area: amphoe.area,
        subdistricts: amphoe.subdistricts,
        description: amphoe.description,
        iconType: undefined // or 'default'
      })
    })
  }
  
  return markers
})

const totalTambons = computed(() => {
  return availableAmphoes.value.reduce((total, amphoe) => total + amphoe.subdistricts, 0)
})

const totalPopulation = computed(() => {
  return availableAmphoes.value.reduce((total, amphoe) => total + amphoe.population, 0)
})

const totalArea = computed(() => {
  return availableAmphoes.value.reduce((total, amphoe) => total + amphoe.area, 0)
})

// Methods
const onProvinceChange = () => {
  selectedAmphoe.value = null
  selectedTambon.value = null
  center.value = selectedProvince.value.coordinates as [number, number]
  zoom.value = 9
}

const selectLocation = (location: any) => {
  if (location.type === 'district') {
    const amphoe = availableAmphoes.value.find(a => a.name === location.name)
    if (amphoe) {
      selectedAmphoe.value = amphoe
      selectedTambon.value = null
    }
  } else if (location.type === 'tambon') {
    const tambon = availableTambons.value.find((t: any) => t.name === location.name)
    if (tambon) {
      selectedTambon.value = tambon
    }
  }
  centerOnLocation()
}

const onAmphoeChange = () => {
  selectedTambon.value = null
  centerOnLocation()
}

const onTambonChange = () => {
  centerOnLocation()
}

const centerOnLocation = () => {
  if (selectedTambon.value) {
    center.value = selectedTambon.value.coordinates as [number, number]
    zoom.value = 14
  } else if (selectedAmphoe.value) {
    center.value = selectedAmphoe.value.coordinates as [number, number]
    zoom.value = 12
  } else {
    center.value = selectedProvince.value.coordinates as [number, number]
    zoom.value = 9
  }
}

const showAllTambons = () => {
  selectedTambon.value = null
  showTambonMode.value = true
  if (selectedAmphoe.value) {
    center.value = selectedAmphoe.value.coordinates as [number, number]
    zoom.value = 11
  }
}

const resetMap = () => {
  center.value = selectedProvince.value.coordinates as [number, number]
  zoom.value = 9
  selectedAmphoe.value = null
  selectedTambon.value = null
  showTambonMode.value = false
}

const toggleViewMode = () => {
  showTambonMode.value = !showTambonMode.value
  if (!showTambonMode.value) {
    selectedTambon.value = null
    showBoundary.value = true // Reset boundary to show when switching to tambon mode
  }
  centerOnLocation()
}

const toggleBoundary = () => {
  showBoundary.value = !showBoundary.value
}

const showResearchDetails = () => {
  const researchData = selectedTambon.value?.research || selectedAmphoe.value?.research
  if (researchData) {
    modalResearchData.value = researchData
    modalAreaName.value = selectedTambon.value?.name || selectedAmphoe.value?.name
    showResearchModal.value = true
  }
}

onMounted(() => {
  // Any additional initialization
})
</script>

<style scoped>
/* Dark mode styles */
.dark .leaflet-container {
  background: #374151;
}

/* Custom map container styles */
.leaflet-container {
  border-radius: 0.5rem;
  position: relative;
  z-index: 1;
}

/* Ensure leaflet controls don't overlap sidebar */
.leaflet-control-container {
  z-index: 2;
}

/* Custom select styles */
select:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Custom button styles */
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Boundary highlight */
.boundary-highlight {
  stroke-dasharray: 5, 5;
  animation: dash 1s linear infinite;
}

@keyframes dash {
  to {
    stroke-dashoffset: -10;
  }
}

/* Custom responsive breakpoint for extra small screens */
@media (min-width: 475px) {
  .xs\:inline {
    display: inline;
  }
  .xs\:hidden {
    display: none;
  }
}

/* Mobile-specific optimizations */
@media (max-width: 640px) {
  .leaflet-container {
    font-size: 12px;
  }
  
  .leaflet-popup-content {
    font-size: 13px;
    line-height: 1.4;
  }
  
  .leaflet-control-zoom {
    margin: 10px 10px 0 0;
  }
}

/* Tablet-specific optimizations */
@media (min-width: 641px) and (max-width: 1024px) {
  .leaflet-popup-content {
    font-size: 14px;
    line-height: 1.5;
  }
}

/* Prevent map from overlapping sidebar on mobile */
@media (max-width: 1023px) {
  .leaflet-container {
    position: relative;
    z-index: 1;
  }
  
  /* Ensure main content doesn't overlap sidebar */
  .flex-1 {
    z-index: 1;
    position: relative;
  }
}
</style>

