PLANTS := mass_damper_spring level_tank

BASE_FILES := wasm_runtime solver dormand_prince_54

API_FUNCTIONS := init get_t get_x set_u \
	step_relative step_relative_with_force \
	step_absolute step_absolute_with_force

API_EXPORTS := $(API_FUNCTIONS:%=-Wl,--export=%)

CXX := clang++
CXXFLAGS := --target=wasm32 -nostdlib -fno-rtti \
	-fno-threadsafe-statics -fno-exceptions -Os -g

LDFLAGS := -Wl,--no-entry

BUILD_DIR := build
SOURCE_DIR := source
PLANT_DIR := $(SOURCE_DIR)/plant

BASE_SOURCE := $(BASE_FILES:%=$(SOURCE_DIR)/%.cpp)
BASE_OBJECT := $(BASE_FILES:%=$(BUILD_DIR)/%.o)

ALL_TARGETS := $(PLANTS:%=%.wasm)

.PHONY: all
all : $(ALL_TARGETS)

%.wasm : $(BASE_OBJECT) $(PLANT_DIR)/%.cpp
	$(CXX) $(CXXFLAGS) $(LDFLAGS) $(API_EXPORTS) $^ -o $@

$(BUILD_DIR)/%.o : $(SOURCE_DIR)/%.cpp | $(BUILD_DIR)
	$(CXX) $(CXXFLAGS) -c $^ -o $@

$(BUILD_DIR) :
	mkdir -p $@

.PHONY: clean
clean :
	rm -rf $(BUILD_DIR) $(ALL_TARGETS)
